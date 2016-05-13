import {Form, ToolBar, IFormColumn} from "lib/underas/container";
import {TileList} from "lib/underas/widget_mod/TileList";
import {Button} from "lib/underas/button";
import {TextInput} from "lib/underas/input";
import {EViewSize} from "lib/underas/component";
import {$http, IRequestConfig, IErrorResponse} from "lib/underas/http";

export interface ICRUDFormConfig {
	domain: string;
}

export class CRUDForm<T> extends Form {
	protected mainList: TileList<T>;
	protected mainTb: ToolBar;
	private _isactive: boolean = false;
	private _config: ICRUDFormConfig;
	protected btAdd: Button;
	protected btDel: Button;
	protected btSave: Button;
	public static EVENT_AFTER_SAVE: string = "save:after";
	public static EVENT_AFTER_UPDATE: string = "update:after";
	public static EVENT_AFTER_INSERT: string = "insert:after";
	public static EVENT_BEFORE_SAVE: string = "save:before";
	public static EVENT_BEFORE_UPDATE: string = "update:before";
	public static EVENT_BEFORE_INSERT: string = "insert:before";
	public static EVENT_BEFORE_DELETE: string = "delete:before";
	public static EVENT_BEFORE_RELOAD: string = "reload:before";
	public static EVENT_ITEM_CHANGE: string = TileList.EVENT_ITEM_CHANGE;

	constructor(p_config:ICRUDFormConfig){
		super();
		this._config = p_config;

	}
	protected buildTileList(p_config:{itemViewResource:string}): void {
		this.mainList = new TileList<T>("");
		this.append(this.mainList);
		this.activate(true);
		this.mainList.setItemViewResource(p_config.itemViewResource);
		this.mainList.addEvent(CRUDForm.EVENT_ITEM_CHANGE, (evt: Event, p_obj:{}) => this.fireEvent(CRUDForm.EVENT_ITEM_CHANGE, p_obj));
	}
	protected buildToolBar():void{
		this._isactive = false;

		this.mainTb = new ToolBar();

		this.btAdd = new Button("Novo");
		this.btAdd.setIcon("glyphicon glyphicon-plus");
		this.btAdd.addEvent('click', this.onAddRecord.bind(this));
		this.mainTb.append(this.btAdd);

		this.btSave = new Button("Salvar");
		this.btSave.setIcon("glyphicon glyphicon-floppy-disk");
		this.btSave.addEvent('click', this.saveItem.bind(this));
		this.mainTb.append(this.btSave);

		this.btDel = new Button("Excluir");
		this.btDel.setIcon("glyphicon glyphicon-trash");
		this.btDel.removeStyleName("btn-default");		
		this.btDel.addEvent('click', this.deleteItem.bind(this));
		this.mainTb.append(this.btDel);

		this.append(this.mainTb);
	}
	private successOperation(): void {
		this.getForm().setEnable(true);
	}
	private getForm(): Form {
		return this;
	}
	private getList(): TileList<T>{
		return this.mainList;
	}
	private onAddRecord(evt: Event): void {
        evt.preventDefault();
        if (this.btAdd.isEnable()) {
            var tmpModule: Form = this.getForm();
            var tfield = tmpModule.getIdField();
            (<TextInput>tmpModule[tfield]).setValue("");
            tmpModule.clearFormItem();
            var tmpColumn: IFormColumn[] = tmpModule.getColumns();
            tmpColumn.every(function(tmpColumn: IFormColumn) {
                if ((<TextInput>tmpModule[tmpColumn.field]).isEnable()) {
                    (<TextInput>tmpModule[tmpColumn.field]).setFocus();
                    return false;
                }
                return true;
            });
            tmpModule[tfield].setFocus();
        }

    }
	private getDefaultRequest(p_act: string, p_method: string): IRequestConfig {
		return { "format": $http.format, "url": $http.url + this._config.domain + p_act, "method": p_method };
	}
	private onUpdateItem(ObjectResp: {}): void {
		let evtAfterSave = this.fireEvent(CRUDForm.EVENT_AFTER_SAVE, ObjectResp);
		if (!evtAfterSave.isDefaultPrevented()) {
			let evtAfterUpdate = this.fireEvent(CRUDForm.EVENT_AFTER_UPDATE, ObjectResp);
			if (!evtAfterUpdate.isDefaultPrevented()) {
				this.getList().updateItem(<T>ObjectResp);
			};
		};
		this.successOperation();
	}
	updateItem(p_objToUpdate: {}): void {
		var req_objToUpdate: IRequestConfig = <IRequestConfig>$.extend(this.getDefaultRequest("", "put"), { "body": p_objToUpdate });
		req_objToUpdate = <IRequestConfig>$.extend(true, { "body": this.getList().getSelectedItem() }, req_objToUpdate);
		let evtBeforeUpdate = this.fireEvent(CRUDForm.EVENT_BEFORE_UPDATE, req_objToUpdate, this.getList().getSelectedItem());
		if (!evtBeforeUpdate.isDefaultPrevented()) {
			this.getForm().setEnable(false);
			$http
				.put(req_objToUpdate.url)
				.body(req_objToUpdate.body)
				.done(
				(res: {}) => this.onUpdateItem(res)
				, (error_req: IErrorResponse) => this.onErrorHandler(error_req)
				);
		}
	}
	private onInsertItem(dta_new: {}): void {
		if (dta_new) {
			let evtAfterSave = this.fireEvent(CRUDForm.EVENT_AFTER_SAVE, dta_new);
			if (!evtAfterSave.isDefaultPrevented()) {
				let evtAfterInsert = this.fireEvent(CRUDForm.EVENT_AFTER_INSERT, dta_new);
				if (!evtAfterInsert.isDefaultPrevented()) {
					this.getList().insertItem(<T>dta_new);
					this.getList().changeToIndex(0, true);
				};
			};
		};
		this.successOperation();
	}
	insertItem(p_objToInsert: {}): void {
		var modTmp: Form = this.getForm();
		var req_objToInsert: IRequestConfig = <IRequestConfig>$.extend(this.getDefaultRequest("", "post"), { "body": p_objToInsert });
		var tfield1: string = modTmp.getIdField();
		var tcolumn1: string = modTmp[tfield1].getName();
		delete req_objToInsert["body"][tcolumn1];
		let evtBeforeInsert = this.fireEvent(CRUDForm.EVENT_BEFORE_INSERT, req_objToInsert);
		if (!evtBeforeInsert.isDefaultPrevented()) {
            this.getForm().setEnable(false);
			$http
				.post(req_objToInsert.url)
				.body(req_objToInsert.body)
				.done(
				(res: {}) => this.onInsertItem(res)
				, (error_req: IErrorResponse) => this.onErrorHandler(error_req)
				);
		};
	}
	private onErrorHandler(p_error: IErrorResponse): void {
		//console.log(p_error.statusText);
	}
	private onDeleteItem(): void {
		if (this.getList()) {
			this.getList().removeItem(this.getList().getSelectedItem());
		};
		this.getForm().clearFormItem();
		this.getList().changeToIndex(0);
		this.successOperation();
	}
	private deleteItem(event: Event): void {
		if (event) {
			event.preventDefault();
		};
        if (this.btDel.isEnable()) {
            var modTmp = this.getForm();
            var tfield = modTmp.getIdField();
            var tcolumn = modTmp[tfield].getName();
            var p_req_delete = this.getDefaultRequest("/" + modTmp[tfield].getValue(), "delete");

			let evtBeforeDelete = this.fireEvent(CRUDForm.EVENT_BEFORE_DELETE, p_req_delete, this.getList().getSelectedItem());
			if (!evtBeforeDelete.isDefaultPrevented()) {
                this.getForm().setEnable(false);
                $http
					.delete(p_req_delete.url)
					.params(p_req_delete.queryData)
					.done(
                    this.onDeleteItem.bind(this)
                    , (error_req: IErrorResponse) => this.onErrorHandler(error_req)
                    )
            };
		}
	}
	private activate(p_on: boolean): void {
		if (this._isactive != p_on) {			
			if (p_on && this.mainList) {
				this._isactive = p_on;
				//if (!tmpList.activate) {
				this.mainList.addEvent(TileList.EVENT_ITEM_CHANGE, (evt: Event, p_item: Object) => this.setFormItem(p_item));
				//};
			} else if (this.getList() && !p_on) {
                //tmpList.setChangeItemHandler(function(p_item: Object){});
				this.mainList.activate = false;
				this._isactive = p_on;
			};
		};
	}
	private onReloadItens(dta_ret: {}[]): void {
		var mainlisttmp: TileList<{}> = this.getList();
		mainlisttmp.setDataProvider(dta_ret);
		if (dta_ret.length > 0) {
			this.getList().changeToIndex(0, true);
		}
		this.successOperation();
	}
	protected reloadItens(event?: Event): void {
		if (event) {
			event.preventDefault();
		};
		var p_req_reload: IRequestConfig = <IRequestConfig>$.extend(this.getDefaultRequest("", "get"), {});
		let evtBeforeReload = this.fireEvent(CRUDForm.EVENT_BEFORE_RELOAD, p_req_reload);
		if (!evtBeforeReload.isDefaultPrevented()) {
			this.getForm().setEnable(false);
			$http
				.get(p_req_reload.url)
				.params(p_req_reload.queryData)
				.done(
				(res: {}[]) => this.onReloadItens(res)
				, (error_req: IErrorResponse) => this.onErrorHandler(error_req)
				);
		};
		this.activate(true);
	}
	private saveItem(event: Event): void {
		if (event) {
			event.preventDefault();
		};
        if (this.btSave.isEnable()) {
            var objToSave: {} = {};
            var modTmp: Form = this.getForm();
            objToSave = modTmp.getFormItem();
            if (objToSave) {
                let evtBeforeSave = this.fireEvent(CRUDForm.EVENT_BEFORE_SAVE, objToSave);
				if (!evtBeforeSave.isDefaultPrevented()) {
                    var pkC = modTmp.getIdField();
                    if (modTmp[pkC].getValue() == "") {
                        this.insertItem(objToSave);
                    } else {
                        this.updateItem(objToSave);
                    };
                };
            };
        }

	}
}