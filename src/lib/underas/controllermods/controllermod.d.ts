import { IPaginationParam } from "lib/underas/util";
import { Component } from "lib/underas/core";
import { IConfigModWindow, ModWindow } from "lib/underas/container";
import { IRequestConf } from "lib/underas/net";
export declare class Controller {
    _uid: number;
    _html: JQuery;
    private _modwindow;
    constructor(tagh: string, tagc: string);
    getEle(p_sel?: string): JQuery;
    setBlankWhenNull(on: boolean): void;
    addEvent(p_on: string, p_event_fn: Function, p_bind?: any): JQuery;
    getInput(): JQuery;
    setLabel(nlabel: string): void;
    setValue(vl: string): void;
    setTransient(on: boolean): void;
    isTransient(): boolean;
    isBlankWhenNull(): boolean;
    setFixed(on: boolean): void;
    isFixed(): boolean;
    getValue(): string;
    setEnable(on: boolean, p_posi?: number): void;
    isEnable(p_posi?: number): boolean;
    setSize(nsize: number): void;
    setMaxLength(p_lgt: number): void;
    setMinLength(p_lgt: number, p_msgerro: string): void;
    setValidation(p_mask: RegExp, p_msgerro: string): void;
    setPlaceHolder(p_placeholder: string): void;
    show(pshow: boolean): void;
    isPrimaryKey(): boolean;
    isValid(): boolean;
    setValid(p_on: boolean): void;
    setColumn(p_column: string): void;
    getColumn(): string;
    getModule(): ModWindow;
    setModule(p_modWindow: any): void;
}
export interface IListView {
    getSelectedItem(): Object;
    updateItem(p_item: Object): void;
    getPaginationParam(): IPaginationParam;
    setDataProvider(p_data: any[]): void;
    getDataProvider(): any[];
    changeToIndex(p_index: number): void;
    itemChange?: Function;
    pageRequest?: Function;
}
export declare class Img extends Component {
    constructor(p_sourceimgp?: string);
    setSource(p_source: string): void;
}
export declare class Text extends Controller {
    constructor(p_text: string);
    setText(p_text: string): void;
}
export declare class Input extends Controller {
    constructor(tipo: string, valor: string);
    setIcon(p_src: string): void;
    setAddonText(p_txt: string): void;
}
export declare class DoubleInput extends Controller {
    constructor(tipo: string, valor: string);
    setIcon(psrc: string, posi?: number): void;
    setAddonText(ptxt: string, posi?: number): void;
}
export declare class TextInput extends Input {
    constructor(p_text?: string);
}
export declare class DoubleTextInput extends DoubleInput {
    constructor(p_text?: string);
}
export declare class CheckBox extends Controller {
    checkedValue: string;
    unCheckedValue: string;
    private checked;
    constructor(p_label: string, p_innerLabel: string);
    setIcon(p_src: string): void;
    setEnable(on: boolean): void;
    isEnable(): boolean;
    setHandlerCheck(evt: Event): void;
    setCheckedValue(p_vl: string): void;
    setUnCheckedValue(p_vl: string): void;
    isValid(): boolean;
    setValue(p_vl: string): void;
    getValue(): string;
}
export interface IConfigDatePicker {
    format?: string;
    startDate?: string;
    endDate?: string;
    todayBtn?: string;
    daysOfWeekDisabled?: number[];
    daysOfWeekHighlighted?: number[];
    autoclose?: boolean;
    language?: string;
    todayHighlight?: boolean;
}
export declare enum DatePartType {
    day = 0,
    month = 1,
    year = 2,
}
export declare class DatePicker extends TextInput {
    dtaA: Date;
    constructor();
    setConfig(p_config: IConfigDatePicker): void;
    getValue(): string;
    setValue(p_value: string): void;
    getDate(): Date;
    getDateString(): string;
    addDate(typeD: DatePartType, pluss: number): void;
    setDate(typeD: DatePartType, vl: number): void;
    refresh(): void;
    isValid(): boolean;
}
export declare class PassWordInput extends Input {
    constructor(p_text?: string);
}
export declare class PercentInput extends TextInput {
    constructor(p_text?: string);
}
export declare class MoneyInput extends TextInput {
    constructor(p_text?: string);
}
export declare class TimeInput extends TextInput {
    constructor(p_text?: string);
}
export declare class EmailInput extends TextInput {
    constructor(p_text?: string);
    isValid(): boolean;
}
export declare class PhoneInput extends TextInput {
    constructor(p_text?: string);
}
export declare class Label extends Controller {
    constructor(p_text?: string);
    setText(p_text: string): void;
}
export declare class Button extends Controller {
    constructor(p_label: string);
    setIcon(psrc: string): void;
    setLabel(p_label: string): void;
    setEnable(on: boolean): void;
    isEnable(): boolean;
}
export declare class LinkButton extends Controller {
    constructor(p_label: string);
    setIcon(psrc: string): void;
    setLabel(p_label: string): void;
    setEnable(on: boolean): void;
    isEnable(): boolean;
}
export interface IMenuTabConfig {
    domain: string;
    target: string;
}
export interface IMenuTab {
    label: string;
    icone: string;
    children: any[];
}
export interface IItemMenuTab {
    label: string;
    icone: string;
    tela: string;
    funcao: string;
}
export declare class MenuTab extends Component {
    _config: IMenuTabConfig;
    constructor(p_config: IMenuTabConfig);
    addTab(label: string, boxM: JQuery, iconeM: string, tmItens: number, tabid: number): void;
    setIcon(p_src: string): void;
    appendTo(p_idFather: string): void;
    setDataProvider(p_dta: any[]): void;
    criarTabNova(label: string, picone: string, childrens: IItemMenuTab[], tabid: number): void;
}
export declare class FileInput extends DoubleTextInput {
    private isvalid;
    constructor(p_placeholder?: string);
    isValid(): boolean;
    getValue(): string;
    setName(p_name: any): void;
}
export declare class Select extends DoubleInput {
    private _valuefield;
    private _labelfield;
    private _urlservice;
    private _rooturlservice;
    constructor(p_placeholder?: string);
    onNotFound(evt: Event): void;
    reSizeList(evt: Event): void;
    showList(p_on: boolean): JQuery;
    getFromUpList(evt: Event): void;
    setFilter(evt: JQueryEventObject): void;
    setValueField(p_column: string): void;
    setLabelField(p_column: string): void;
    getValueField(): string;
    getLabelField(): string;
    setDataProvider(p_dta: any[]): void;
    getValue(): string;
    getText(): string;
    isValid(): boolean;
    setValue(p_vl: string): void;
    getDescFromServiceByValue(p_vl: string): string;
    reloadService(evt?: Event): void;
    fromService(p_req_service: IRequestConf): void;
}
export declare class ListView extends Component implements IListView {
    dataProvider: any[];
    private tmpDataProvider;
    private maxCells;
    _urlTemplate: string;
    _itemTemplatePrecopiled: Function;
    private _classItemTemplateHtml;
    _ind: number;
    _itFilter: TextInput;
    _itOrderBy: Select;
    itemChange: Function;
    _islistview: boolean;
    private _pag;
    constructor(p_title: string);
    getPaginationParam(): IPaginationParam;
    setDataProvider(p_dta: any[]): ListView;
    getDataProvider(): any[];
    setHeight(p_height: number): void;
    clear(): void;
    private changePg(evt);
    private getRowCell();
    private setPage(p_page);
    refresh(): ListView;
    private getTmpUrl(fnAfter);
    setFilter(evt: JQueryEventObject): void;
    setOrderField(evt: Event): void;
    setOrder(evt: Event): void;
    orderDesc(p_campo: string): void;
    orderAsc(p_campo: string): void;
    getSelectedIndex(): number;
    getSelectedItem(): Object;
    setSelectedItem(p_item: Object): void;
    setSelectedIndex(p_index: number): void;
    changeToIndex(p_index: number): void;
    updateItem(p_item: Object): void;
    replaceItem(p_item: Object, p_index?: number): void;
    insertItem(p_item: Object, p_where?: string): void;
    removeSelectedItem(): void;
    removeItem(p_item: Object): void;
    onChangeSelectedItem(evt: Event): void;
    changeSelectedItem(tgt: JQuery): void;
}
export declare enum ENotifyType {
    SUCCESS = 0,
    INFO = 1,
    PRIMARY = 2,
    WARNING = 3,
    DANGER = 4,
}
export interface IItemNotify {
    title: string;
    subtitle: string;
    count: number;
    type: ENotifyType;
    icon: string;
    module: string;
    moduleAction?: string;
    moduleTitle: string;
    moduleIcon: string;
}
export declare class DefaultNotifyItemRender extends Component {
    constructor(p_obj: IItemNotify);
}
export declare enum ENotifyPoolType {
    SUCCESS = 0,
    INFO = 1,
    PRIMARY = 2,
    WARNING = 3,
    DANGER = 4,
    DEFAULT = 5,
}
export declare class NotifyPool extends Component {
    _vlcount: number;
    constructor(p_title: string);
    executeActionNotify(evt: Event): void;
    showNotifications(evt: Event): void;
    addNotify(p_notify: IItemNotify): void;
    setValue(p_vl: number): void;
    getValue(): number;
    setType(ptype: ENotifyPoolType): void;
    setIcon(p_icon: string): void;
}
export declare class NumericStepper extends DoubleTextInput {
    maxvl: number;
    minvl: number;
    stepvl: number;
    constructor(p_text?: number);
    getVL(): number;
    setVL(vl: number): void;
    aumentar(): void;
    diminuir(): void;
    setMin(vl: number): void;
    setMax(vl: number): void;
    setStep(vl: number): void;
}
export declare class ProgressBar extends Component {
    _vl: number;
    constructor(p_vl?: number);
    setProgress(p_vl: number): void;
    setValue(p_vl: number): void;
    getValue(): number;
    setBarColor(bgc: string): void;
    setToolTip(tooltip: string): void;
    setLabel(nlabel: string): void;
}
export declare class TextArea extends Controller {
    constructor(p_text?: string);
    getValue(): string;
}
export declare class AlertMsg extends Controller {
    static TP_SUCCESS: string;
    static TP_INFO: string;
    static TP_WARNING: string;
    static TP_ERROR: string;
    constructor(p_text?: string);
    setText(p_text: string): void;
    getText(): string;
    setValue(p_text: string): void;
    getValue(): string;
    isPrimaryKey(): boolean;
    isValid(): boolean;
    setType(p_type: string): void;
}
export interface IViewClass extends Function {
    prototype: {};
    _configModWindow: IConfigModWindow;
    name: string;
    new (): Function;
}
export declare function ItemView(p_url_source: string, p_mainlist_name?: string): ClassDecorator;
