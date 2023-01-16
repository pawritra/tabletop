export async function fetchWebpage(url: string){
  const payload = { url }
  const website = await fetch('/api/parse', {
      method: "POST",
      body: JSON.stringify(payload)
    });
  return await website.json();
}
