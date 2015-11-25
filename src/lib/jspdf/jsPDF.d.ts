import {IReportTemplate} from "./ijspdf";

export class jsPDF{
	setJereport(p_report:IReportTemplate): void;
	save(p_doc_name:string):void;
	constructor(orientation:string, metric:string, papertype:string)
}