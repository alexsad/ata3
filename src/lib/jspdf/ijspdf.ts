export interface IReportTemplateItem{

}

export interface IReportTemplate {
	dataSets: { itens: IReportTemplateItem[] }[];
}

//reporttemplate["dataSets"][0]["itens"]