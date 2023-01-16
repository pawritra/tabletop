import Modal from '@/components/Modal';
import { parseHTML } from '@/utils/parser';
import { FormEvent, useState } from 'react';
import { fetchWebpage } from '../utils/fetcher'; 
import Head from 'next/head';


export default function Home() {
  const [ input, setInput ] = useState<Record<string, string>>({
    url: '' 
  })
  const [ parsed, setParsed ] = useState<HTMLTableElement[] | null>(null);
  const [selected, setSelected] = useState<HTMLTableElement | null>(null);

  function closeHandler(){ setSelected(null); }

  function scrollToTargetAdjusted(){
    const element = document.getElementById('results');
    const headerOffset = 60;
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
      }, 400)
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
      <Head>
        <title>TABLETOP</title>
      </Head>
      <header className="container is-max-desktop">
        <div>
          <h1 className="is-size-1 title my-6">TABLETOP</h1>
        </div>
        <form onSubmit={submitHandler} className="">
          <input className="input is-medium" name="url" onChange={changeHandler} placeholder="Enter URL" />
          <button className="button is-primary is-medium m-6" type="submit">PARSE</button>
          <p>Enter the website URL you want to scrape data from and press PARSE button</p>
        </form>
      </header>



      <section id="results" className="container is-max-desktop w-max">
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
