define(["require", "exports", "./jspdf"], function (require, exports, jsPDF) {
    var PDFRender = (function () {
        function PDFRender() {
            this._tmLinha = 6;
            this._margin_superior = 22;
            this._margem_lateral = 10;
            this._poYO = this._margin_superior + 9;
            this._poY = this._poYO;
            this._tmLinhaH = 190;
            this._limitLinhas = 39;
            this._pagA = 1;
            if (!this._doc) {
                this._doc = new jsPDF('p', 'pt', 'a4');
            }
        }
        PDFRender.prototype.getTotalPags = function () {
            return parseInt((this._tmDta / this._limitLinhas) + "") + 1;
        };
        PDFRender.prototype.setData = function (p_data) {
            this._data = p_data;
            this._tmDta = this._data.length;
        };
        PDFRender.prototype.setConfig = function (p_config) {
            this._config = p_config;
        };
        PDFRender.prototype.render = function () {
            this.setHeaderPage(0, true);
            var xc = 0;
            for (var x = 0; x < this._tmDta; x++) {
                var r = 255;
                var g = 255;
                var b = 255;
                if (x % 2 == 0) {
                    r = 223;
                    g = 220;
                    b = 216;
                }
                this._poY += this._tmLinha;
                this._doc.setDrawColor(0);
                this._doc.setFillColor(r, g, b);
                this._doc.rect(this._margem_lateral, this._poY - this._tmLinha, this._tmLinhaH, this._tmLinha, 'FD');
                var posiX = this._margem_lateral + 1;
                var tmC = this._config.render.length;
                for (var z = 0; z < tmC; z++) {
                    var textI = this._data[x][this._config.render[z].column] + "";
                    var widthTMP = this.getWidth(this._config.render[z].width);
                    if (widthTMP > 0) {
                        textI = textI.substring(0, (parseInt((widthTMP / 3) + "") + 2));
                    }
                    this._doc.text(posiX, this._poY - 2, "" + textI);
                    posiX += widthTMP;
                }
                xc++;
                if ((xc) > this._limitLinhas) {
                    this._pagA++;
                    this._poY = this._poYO;
                    xc = 0;
                    this._doc.addPage();
                    this.setHeaderPage(0, true);
                }
            }
            this._poY += this._tmLinha;
            this._doc.setDrawColor(0);
            this._doc.setFillColor(59, 56, 63);
            this._doc.rect(this._margem_lateral, this._poY - this._tmLinha, this._tmLinhaH, this._tmLinha, 'FD');
            this._doc.setTextColor(255, 255, 255);
            this._doc.text(this._margem_lateral + 1, this._poY - 1, "Total de Registros: " + this._tmDta);
            this._doc.setTextColor(0, 0, 0);
            this._doc.save("relatorio_" + "name_report" + ".pdf");
        };
        PDFRender.prototype.getWidth = function (p_perc) {
            var tmpTm = parseInt((p_perc * this._tmLinha / 100) + "") - this._margem_lateral;
            return tmpTm;
        };
        PDFRender.prototype.getBase64Image = function (img) {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            return dataURL;
        };
        PDFRender.prototype.setHeaderPage = function (altura, showTitleAgain) {
            var hj = new Date();
            var diaS = "" + hj.getDate();
            if (diaS.length < 2) {
                diaS = "0" + diaS;
            }
            var totalPgs = this.getTotalPags();
            var totalPs = "" + totalPgs;
            if (totalPgs < 10) {
                totalPs = "0" + totalPgs;
            }
            var pagAS = "" + this._pagA;
            if (this._pagA < 10) {
                pagAS = "0" + this._pagA;
            }
            var montS = "" + (hj.getMonth() + 1);
            if (montS.length < 2) {
                montS = "0" + montS;
            }
            var dateParsed = diaS + '/' + montS + '/' + hj.getFullYear();
            var imgLogo = $("#logReports");
            var marginLogo = 0;
            if (imgLogo.length > 0) {
                var imgData = this.getBase64Image(imgLogo[0]);
                this._doc.addImage(imgData, 'JPEG', this._margem_lateral, 10, 12, 12);
                marginLogo = 13;
            }
            if (showTitleAgain) {
                this._doc.setFontSize(24);
                this._doc.text(this._margem_lateral + marginLogo, 16, this._config.title);
                this._doc.setFontSize(12);
                this._doc.text(this._margem_lateral + marginLogo, 22, this._config.subtitle);
            }
            this._doc.text(this._tmLinhaH - 11, altura + 17, "pag.: " + pagAS + "/" + totalPs);
            this._doc.text(this._tmLinhaH - 11, altura + 22, dateParsed);
            this._doc.line(this._margem_lateral, altura + 23, this._tmLinhaH + 10, altura + 23);
            this._doc.setDrawColor(0);
            this._doc.setFillColor(59, 56, 63);
            this._doc.rect(this._margem_lateral, this._poY - this._tmLinha, this._tmLinhaH, this._tmLinha, 'FD');
            this._doc.setTextColor(255, 255, 255);
            var posiX1 = this._margem_lateral + 1;
            var tmC = this._config.render.length;
            for (var y = 0; y < tmC; y++) {
                var textI = new String(this._config.render[y].label);
                this._doc.text(posiX1, this._poY - 2, "" + textI);
                posiX1 += this.getWidth(this._config.render[y].width);
            }
            this._doc.setTextColor(0, 0, 0);
        };
        ;
        return PDFRender;
    })();
    exports.PDFRender = PDFRender;
});
