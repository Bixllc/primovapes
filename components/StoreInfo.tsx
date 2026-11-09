import { store } from "@/lib/data";

export function StoreAddress() {
  return (
    <address style={{ fontStyle: "normal" }}>
      <a href={store.mapsUrl} target="_blank" rel="noopener noreferrer" className="plain-link">
        {store.address}
        <br />
        {store.cityStateZip}
      </a>
    </address>
  );
}

export function StoreHours() {
  return (
    <div>
      {store.hours.map((h) => (
        <div key={h.days}>
          {h.days} {h.time}
        </div>
      ))}
    </div>
  );
}

export function StoreRating() {
  return (
    <span>
      <span className="stars">★★★★★</span> {store.rating.toFixed(1)} · {store.reviewCount} reviews
    </span>
  );
}
