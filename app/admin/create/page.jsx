import Link from "next/link";
import React from "react";

export default function CreatePage() {
  return (
    <div className="page flex-page">
      <Link href="/admin/create/league" className="btn">
        League
      </Link>
      <Link href="/admin/create/boardgame" className="btn">
        Boardgame
      </Link>
    </div>
  );
}
