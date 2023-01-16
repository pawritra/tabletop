import Modal from '@/components/Modal';
import { parseHTML } from '@/utils/parser';
import { FormEvent, useState } from 'react';
import { fetchWebpage } from '../utils/fetcher'; 


export default function Home() {
  const [ input, setInput ] = useState<Record<string, string>>({
    url: '' 
  })
  const [ parsed, setParsed ] = useState<HTMLTableElement[] | null>(null);
  const [selected, setSelected] = useState<HTMLTableElement | null>(null);

  function closeHandler(){ setSelected(null); }

  function scrollToTargetAdjusted(){
    const element = document.getElementById('results');
    const headerOffset = 0;
    const elementPosition = element?.getBoundingClientRect().top;
    let offsetPosition = 0;
    if(elementPosition)
      offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
  }

  async function submitHandler(event: FormEvent){
    event.preventDefault();
    try{
      const webpage = await fetchWebpage(input.url);
      const tables = parseHTML(webpage.body);

      setParsed(Array.from(tables));
      setTimeout(() => {
        scrollToTargetAdjusted();
      }, 200)
    } catch(err) {
      console.log(err);
    }
  }

  function changeHandler(event: any){
    const field = event.target.name;
    switch(field){
      case 'url':
        setInput({ url: event.target.value });
    }
  }

  function downloadHandler(table: HTMLTableElement){
    setSelected(table);
  }

  return (
    <main>
      {selected && <Modal selected={selected} onCancel={closeHandler}/>}
      <header className="container is-max-desktop">
        <form onSubmit={submitHandler} className="">
          <div>
            <label className="label" htmlFor="url">Enter URL</label>
            <input className="input is-medium" name="url" onChange={changeHandler} placeholder="Enter URL" />
          </div> 
          <button className="button is-primary is-medium m-6" type="submit">Parse</button>
        </form>
      </header>



      <section id="results" className="container pt-6 is-max-desktop w-max">
        {parsed && parsed.map(table => {
          if(table) return (
          <div className="mt-6 box">
            <div className="has-text-right">
              <button className="button is-info" onClick={() => downloadHandler(table)}>Download</button>
            </div>
            <table 
              className="table w-100 mt-4" 
              dangerouslySetInnerHTML={{ __html: table.innerHTML }}
            /> 
          </div>);
        })}
      </section>


    </main>
  )
}
