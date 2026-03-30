import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

const symbols = [
    { symbol: "^NSEI", label: "NIFTY 50", group: "Index" },
    { symbol: "^BSESN", label: "SENSEX", group: "Index" },
    { symbol: "^NSEBANK", label: "BANK NIFTY", group: "Index" },
    { symbol: "^GSPC", label: "S&P 500", group: "Index" },
    { symbol: "^IXIC", label: "NASDAQ", group: "Index" },
    { symbol: "GC=F", label: "GOLD", group: "Commodity" },
    { symbol: "CL=F", label: "CRUDE OIL", group: "Commodity" },
    { symbol: "AAPL", label: "Apple", group: "US Tech" },
    { symbol: "META", label: "Meta", group: "US Tech" },
    { symbol: "GOOGL", label: "Google", group: "US Tech" },
    { symbol: "MSFT", label: "Microsoft", group: "US Tech" },
    { symbol: "NVDA", label: "NVIDIA", group: "US Tech" },
    { symbol: "AMZN", label: "Amazon", group: "US Tech" },
    { symbol: "TATAMOTORS.NS", label: "Tata Motors", group: "Tata" },
    { symbol: "TCS.NS", label: "TCS", group: "Tata" },
    { symbol: "TATASTEEL.NS", label: "Tata Steel", group: "Tata" },
    { symbol: "TATAPOWER.NS", label: "Tata Power", group: "Tata" },
    { symbol: "TATACONSUM.NS", label: "Tata Consumer", group: "Tata" },
    { symbol: "TATACHEM.NS", label: "Tata Chemicals", group: "Tata" },
    { symbol: "TITAN.NS", label: "Titan", group: "Tata" },
    { symbol: "RELIANCE.NS", label: "Reliance", group: "India" },
    { symbol: "INFY.NS", label: "Infosys", group: "India" },
    { symbol: "HDFCBANK.NS", label: "HDFC Bank", group: "India" },
    { symbol: "WIPRO.NS", label: "Wipro", group: "India" },
];

export async function GET() {
    try {
        const results = await Promise.all(
            symbols.map(({ symbol, label, group }) =>
                yahooFinance.quote(symbol)
                    .then((q) => ({
                        label,
                        group,
                        value: q.regularMarketPrice?.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                        }),
                        change: `${q.regularMarketChangePercent >= 0 ? "+" : ""}${q.regularMarketChangePercent?.toFixed(2)}%`,
                        up: q.regularMarketChangePercent >= 0,
                    }))
                    .catch(() => ({
                        label,
                        group,
                        value: "N/A",
                        change: "N/A",
                        up: null,
                    }))
            )
        );

        return Response.json({ indices: results });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}