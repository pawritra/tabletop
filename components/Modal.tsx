import { download, htmlTableToJSON } from "@/utils/parser";
import { createPortal } from "react-dom"; 

type Props = {
  selected: HTMLTableElement,
  onCancel: () => void
}
const Modal = ({ selected, onCancel }: Props) => {
  const body = document.getElementsByTagName('body')[0];

  function jsonDownload(){
    const payload = htmlTableToJSON(selected);
    download(payload);
    onCancel();
  }

  return createPortal(<div className="modal is-active">
  <div className="modal-background"></div>
  <div className="modal-content">
    <div className="box has-text-centered">
      <h1 className="title">Download</h1>
      <div>
        <button className="button is-primary mx-1" onClick={jsonDownload}>JSON</button>
      </div>
    </div>
  </div>
  <button onClick={onCancel} className="modal-close is-large" aria-label="close"></button>
</div>, body);
}

export default Modal;
