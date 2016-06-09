import {EventEmitter} from "lib/underas/core";
import {Form, ToolBar, IFormColumn} from "lib/underas/container";
import {TileList} from "lib/underas/widget_mod/TileList";
import {Button} from "lib/underas/button";
import {TextInput} from "lib/underas/input";
import {EViewSize, EBasicColorStatus} from "lib/underas/component";
import {$http, IRequestConfig, IErrorResponse} from "lib/underas/http";
import jQuery = require("jquery");

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
	public onAfterSave: EventEmitter<T> = new EventEmitter();
	public onAfterUpdate: EventEmitter<T> = new EventEmitter();
	public onAfterInsert: EventEmitter<T> = new EventEmitter();
	public onBeforeSave: EventEmitter<T> = new EventEmitter();
	public onBeforeUpdate: EventEmitter<IRequestConfig> = new EventEmitter();
	public onBeforeInsert: EventEmitter<IRequestConfig> = new EventEmitter();
	public onBeforeDelete: EventEmitter<IRequestConfig> = new EventEmitter();
	public onBeforeReload: EventEmitter<IRequestConfig> = new EventEmitter();
	public onItemChange: EventEmitter<{}> = new EventEmitter();

	constructor(p_config: ICRUDFormConfig) {
		super();
		this._config = p_config;
		this.addStyleName("CRUDForm");
	}
	protected buildTileList(p_config: { itemViewResource: string }): void {
		this.mainList = new TileList<T>("");
		this.append(this.mainList);
		this.activate(true);
		this.mainList.setItemViewResource(p_config.itemViewResource);
		this.mainList.addEvent(TileList.EVENT_ITEM_CHANGE, (evt: Event, p_obj: {}) => this.onItemChange.emit(p_obj));
	}
	protected buildToolBar(): void {
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
		//this.btDel.removeStyleName("btn-default");	
		this.btDel.setColor(EBasicColorStatus.PRIMARY);
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
	private getList(): TileList<T> {
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
	private onUpdateItem(p_objectResp: T): void {
		this.onAfterSave.emit(p_objectResp).done(() => {
			this.onAfterUpdate.emit(p_objectResp).done(() => {
				this.getList().updateItem(<T>p_objectResp);
			});
		});
		this.successOperation();
	}
	updateItem(p_objToUpdate: T): void {
		let req_objToUpdate: IRequestConfig = <IRequestConfig>jQuery.extend(this.getDefaultRequest("", "put"), { "body": p_objToUpdate });
		req_objToUpdate = <IRequestConfig>jQuery.extend(true, { "body": this.getList().getSelectedItem() }, req_objToUpdate);
		this.onBeforeUpdate.emit(req_objToUpdate).done(() => {
			this.getForm().setEnable(false);
			$http
				.put(req_objToUpdate.url)
				.body(req_objToUpdate.body)
				.done(
				(res: T) => this.onUpdateItem(res)
				, (error_req: IErrorResponse) => this.onErrorHandler(error_req)
				);
		});
	}
	private onInsertItem(dta_new: T): void {
		if (dta_new) {
			this.onAfterSave.emit(dta_new).done(() => {
				this.onAfterInsert.emit(dta_new).done(() => {
					this.getList().insertItem(<T>dta_new);
					this.getList().changeToIndex(0, true);
				});
			});
		};
		this.successOperation();
	}
	insertItem(p_objToInsert: T): void {
		var modTmp: Form = this.getForm();
		var req_objToInsert: IRequestConfig = <IRequestConfig>jQuery.extend(this.getDefaultRequest("", "post"), { "body": p_objToInsert });
		var tfield1: string = modTmp.getIdField();
		var tcolumn1: string = modTmp[tfield1].getName();
		delete req_objToInsert["body"][tcolumn1];
		this.onBeforeInsert.emit(req_objToInsert).done(() => {
            this.getForm().setEnable(false);
			$http
				.post(req_objToInsert.url)
				.body(req_objToInsert.body)
				.done(
				(res: T) => this.onInsertItem(res)
				, (error_req: IErrorResponse) => this.onErrorHandler(error_req)
				);
		});
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
            let modTmp = this.getForm();
            let tfield = modTmp.getIdField();
            let tcolumn = modTmp[tfield].getName();
            let p_req_delete = this.getDefaultRequest("/" + modTmp[tfield].getValue(), "delete");
            this.onBeforeDelete.emit(p_req_delete).done(() => {
                this.getForm().setEnable(false);
                $http
					.delete(p_req_delete.url)
					.params(p_req_delete.queryData)
					.done(
                    this.onDeleteItem.bind(this)
                    , (error_req: IErrorResponse) => this.onErrorHandler(error_req)
                    )
            });
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
		var p_req_reload: IRequestConfig = <IRequestConfig>jQuery.extend(this.getDefaultRequest("", "get"), {});
		this.onBeforeReload.emit(p_req_reload).done(() => {
			this.getForm().setEnable(false);
			$http
				.get(p_req_reload.url)
				.params(p_req_reload.queryData)
				.done(
				(res: {}[]) => this.onReloadItens(res)
				, (error_req: IErrorResponse) => this.onErrorHandler(error_req)
				);
		});
		this.activate(true);
	}
	private saveItem(event: Event): void {
		if (event) {
			event.preventDefault();
		};
        if (this.btSave.isEnable()) {
            //let objToSave: {} = {};
            let modTmp: Form = this.getForm();
            let objToSave = <T>modTmp.getFormItem();
            if (objToSave) {
                this.onBeforeSave.emit(objToSave).done(
					() => {
						let pkC = modTmp.getIdField();
						if (modTmp[pkC].getValue() == "") {
							this.insertItem(objToSave);
						} else {
							this.updateItem(objToSave);
						};
					}
                );
            };
        }

	}
}