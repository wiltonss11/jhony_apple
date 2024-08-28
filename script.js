const anexos = {
    'I': [
        { faixa: 180000, aliquota: 4.00, parcela: 0 },
        { faixa: 360000, aliquota: 7.30, parcela: 5940 },
        { faixa: 720000, aliquota: 9.50, parcela: 13860 },
        { faixa: 1800000, aliquota: 10.70, parcela: 22500 },
        { faixa: 3600000, aliquota: 14.30, parcela: 85300 },
        { faixa: Infinity, aliquota: 19.00, parcela: 378000 }
    ],
    'II': [
        { faixa: 180000, aliquota: 4.50, parcela: 0 },
        { faixa: 360000, aliquota: 7.80, parcela: 5940 },
        { faixa: 720000, aliquota: 10.00, parcela: 13860 },
        { faixa: 1800000, aliquota: 11.20, parcela: 22500 },
        { faixa: 3600000, aliquota: 14.70, parcela: 85500 },
        { faixa: Infinity, aliquota: 30.00, parcela: 720000 }
    ],
    'III': [
        { faixa: 180000, aliquota: 6.00, parcela: 0 },
        { faixa: 360000, aliquota: 11.20, parcela: 9360 },
        { faixa: 720000, aliquota: 13.50, parcela: 17640 },
        { faixa: 1800000, aliquota: 16.00, parcela: 35640 },
        { faixa: 3600000, aliquota: 21.00, parcela: 125640 },
        { faixa: Infinity, aliquota: 33.00, parcela: 648000 }
    ],
    'IV': [
        { faixa: 180000, aliquota: 4.50, parcela: 0 },
        { faixa: 360000, aliquota: 9.00, parcela: 8100 },
        { faixa: 720000, aliquota: 10.20, parcela: 12420 },
        { faixa: 1800000, aliquota: 14.00, parcela: 39780 },
        { faixa: 3600000, aliquota: 22.00, parcela: 183780 },
        { faixa: Infinity, aliquota: 33.00, parcela: 828000 }
    ],
    'V': [
        { faixa: 180000, aliquota: 15.50, parcela: 0 },
        { faixa: 360000, aliquota: 18.00, parcela: 4500 },
        { faixa: 720000, aliquota: 19.50, parcela: 9900 },
        { faixa: 1800000, aliquota: 20.50, parcela: 17100 },
        { faixa: 3600000, aliquota: 23.00, parcela: 62100 },
        { faixa: Infinity, aliquota: 30.50, parcela: 540000 }
    ]
};

function preencherCampos() {
    const anexo = document.getElementById('anexo').value;
    const rbt12 = parseFloat(document.getElementById('rbt12').value);
    const aliquotaNominal = document.getElementById('aliquotaNominal');
    const parcelaDeduzir = document.getElementById('parcelaDeduzir');

    if (!anexo || isNaN(rbt12)) return;

    const faixas = anexos[anexo];
    for (const faixa of faixas) {
        if (rbt12 <= faixa.faixa) {
            aliquotaNominal.value = faixa.aliquota.toFixed(2);
            parcelaDeduzir.value = faixa.parcela.toFixed(2);
            break;
        }
    }
}

function calcular() {
    const rbt12 = parseFloat(document.getElementById('rbt12').value);
    const aliquotaNominal = parseFloat(document.getElementById('aliquotaNominal').value) / 100;
    const parcelaDeduzir = parseFloat(document.getElementById('parcelaDeduzir').value);
    const FaturamentoMensal = parseFloat(document.getElementById('FaturamentoMensal').value);

    if (isNaN(rbt12) || isNaN(aliquotaNominal) || isNaN(parcelaDeduzir) || isNaN(FaturamentoMensal) || rbt12 <= 0) return;

    const aliquotaEfetiva = ((rbt12 * aliquotaNominal) - parcelaDeduzir) / rbt12;
    const aliquotaEfetivaPercentual = (aliquotaEfetiva * 100).toFixed(4);
    const totalDas = FaturamentoMensal * aliquotaEfetiva;

    document.getElementById('aliquotaEfetivaValor').innerText = `${aliquotaEfetivaPercentual}%`;
    document.getElementById('totalDasValor').innerText = `R$ ${totalDas.toFixed(2)}`;
}

function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const isOpen = content.style.maxHeight;
    content.style.maxHeight = isOpen ? null : content.scrollHeight + 'px';
    header.querySelector('.accordion-icon').innerText = isOpen ? '+' : '−';
}
