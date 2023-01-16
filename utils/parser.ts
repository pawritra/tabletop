interface Object {
    [key: string]: any
}


export function parseHTML(content: string): NodeListOf<HTMLTableElement>{
  const el = document.createElement('html');
  el.innerHTML = content;
  const body = el.querySelector('body') as HTMLBodyElement;
  return body.querySelectorAll('table');
}

export function download(data: any){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  var dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", "data.json");
  dlAnchorElem.click();
}

export function downloadAsJSON(content: string) {
  const tables = parseHTML(content);
  const payload: Object = {};
  tables.forEach((table, index) => {
    payload[`Table ${index}`] = htmlTableToJSON(table);
  })

  download(payload);
}



function getTableHeaders(table: HTMLTableElement){
  const headers: Array<string> = [];
  Array.from(table.querySelectorAll("th")).forEach((head: HTMLElement) => { 
    if(head.textContent && head.textContent !== undefined && head.textContent !== ""){
      headers.push(head.textContent.toString());
    } else {
      headers.push("");
    }
  });

  return headers;
}


export function htmlTableToJSON(table: HTMLTableElement){
  const headers = getTableHeaders(table);
  let data: Array<Record<string, string>> = [];
  Array.from(table.querySelectorAll('tr')).forEach(row => {
    const dataRow = Array.from(row.querySelectorAll('td')).map(elem => {
      if(elem.querySelector('a')){
        return `${elem.textContent} : ${elem.querySelector('a')?.href}`;
      } else {
        return elem.textContent;
      }
    })

    if(dataRow.length > 0){
      const elem: Array<Array<string | null>> = []
      headers.forEach((header, index) => { 
        elem.push([header, dataRow[index]])
      })
      data.push(Object.fromEntries(elem));
    }
  })

  return data;
}


