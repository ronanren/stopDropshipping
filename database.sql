CREATE TABLE sites(
   URL            TEXT PRIMARY KEY NOT NULL,
   NAME           TEXT NOT NULL,
   DROPSHIPPING   BOOLEAN NOT NULL,
   LOGO           TEXT NOT NULL
);

CREATE TABLE products(
    URL_PRODUCT    TEXT PRIMARY KEY NOT NULL,
    URL            TEXT NOT NULL REFERENCES sites,
    IMAGE          TEXT NOT NULL,
    ALISEEKS       TEXT NOT NULL
)