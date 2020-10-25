/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// some js code
function textToHtml (currentDoc) {
    let { doc, selections, range} = currentDoc;
	let htmlText = getHtml(doc, selections, range);
	let html = `
        <html>
        <head>
            <style>
            .center {
               text-align: center;
            }
            .span0{
            color: red;
            background-color: white;
            }
            .span1{
            color: purple;
            background-color: white;
            }
            .span2{
            color: red;
            background-color: white;
            }
            .span3{
            color: blue;
            background-color: white;
            }
            </style>
            </head>
            <body>
            <h1> Fake Results for Running of Rules </h1>
            <p> ${htmlText} </p>
            </body>
            </html>
            `;
	return html;
}
function getHtml (text, selections) {
	let texta = text;

    selections.forEach((s, i) => {
        let cn = 'span' + i;
		let spanTextht = `<span class="${cn}">${s}</span>`;
		texta = texta.replaceAll(s, spanTextht);
	});
    
    let textb = texta.split(/\r?\n/);
    let finalHtml = '';
    textb.forEach((l, i) => {
        finalHtml = `${finalHtml} <p>${l}</p>`;
    });
	return finalHtml;
}
export default textToHtml;
