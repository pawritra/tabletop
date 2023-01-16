import {  htmlTableToCSV, htmlTableToJSON } from "../utils/parser";
import  {downloadCSV, downloadJSON,}  from '../utils/downloader';
import { createPortal } from "react-dom"; 

type Props = {
  selected: HTMLTableElement,
  onCancel: () => void
}
const Modal = ({ selected, onCancel }: Props) => {
  const body = document.getElementsByTagName('body')[0];

  function jsonDownload(){
    const payload = htmlTableToJSON(selected);
    downloadJSON(payload);
    onCancel();
  }

  function csvDownload(){
    const payload = htmlTableToCSV(selected);
    downloadCSV(payload);
    onCancel();
  }

  return createPortal(<div className="modal is-active modal-open">
  <div className="modal-background"></div>
  <div className="modal-content">
    <div className="box has-text-centered">
      <h1 className="title">Download</h1>
      <div>
        <button className="button is-primary mx-1" onClick={jsonDownload}>JSON</button>
        <button className="button is-primary mx-1" onClick={csvDownload}>CSV</button>
      </div>
    </div>
  </div>
  <button onClick={onCancel} className="modal-close is-large" aria-label="close"></button>
</div>, body);
}

export default Modal;
