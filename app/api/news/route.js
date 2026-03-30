
export async function GET() {
    const res = await fetch("https://newsapi.org/v2/everything?q=bitcoin&apiKey=7be27372b6114ad089dcdc17fff1b9d3");
    const data = await res.json();
    // console.log("API RESPONSE:", data);
    return Response.json(data);
}