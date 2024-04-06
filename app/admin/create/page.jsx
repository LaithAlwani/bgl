import Link from "next/link";
import React from "react";

export default function CreatePage() {
  return (
    <div className="page flex-page">
      <Link href="/admin/create/boardgame" className="btn btn-green">
        Boardgame
      </Link>
      <Link href="/admin/create/league" className="btn btn-primary">
        League
      </Link>
      <Link href="/admin/create/session" className="btn btn-red">
        Session
      </Link>
    </div>
  );
}
