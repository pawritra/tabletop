export function downloadJSON(data: any){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  var dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", "data.json");
  dlAnchorElem.click();
}

export function downloadCSV(csv: any){
  var dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", csv);
  dlAnchorElem.setAttribute("download", "data.csv");
  dlAnchorElem.click();
}
