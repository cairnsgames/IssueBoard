import { useState, useEffect } from "react";

export const loadURLDetails = (valid) => {
  let hash = window.location.hash;
  hash = hash.split("?")[0].replace("#", "");

  const myURL = new URL(window.location.href);
  if (window.location.hash) {
    myURL.search = window.location.hash.substring(
      window.location.hash.indexOf("?")
    );
  }
  const hrefparams = [];
  myURL.searchParams.forEach((value, key) => {
    if (!valid || valid.includes(key)) {
      hrefparams.push({ key, value });
    }
  });

  return {
    href: window.location.href,
    hash: hash,
    params: hrefparams,
    hostname: window.location.hostname,
    port: window.location.port,
    pathname: window.location.pathname,
    path: window.location.pathname.split(/\//).filter((x) => x !== ""),
    protocol: window.location.protocol,
    set: (url) => { window.location.url = url;},
    setHash: (url) => { window.location.hash = url;},
  };
};

export const useLocation = (message, validParams) => {
  const [details, setDetails] = useState({});
  const [valid, setValid] = useState(validParams);

  const setValues = () => {
    const values = loadURLDetails(valid)
    setDetails(values);
  }
  useEffect(() => {
    setValues();
  }, []);

  const popstate = () => {
    setValues();
  }
  const locationchange = () => {
    setValues();
  }

  useEffect(() => {
    window.addEventListener("popstate", popstate);
    window.addEventListener("locationchange", locationchange);
    return () => {
      window.removeEventListener("popstate", popstate);
      window.removeEventListener("locationchange", locationchange);
    }
  }, []);

  const set = (url) => {
    window.history.pushState(null, "", url);
    setDetails(loadURLDetails(valid));
  };
  const setHash = (newHash) => {
    window.location.hash = newHash;
  };

  const param = (key) => {
    const item = details.params.find(i => i.key === key);
    return item?.value;
  }

  return { params: details.params, hash: details.hash, set, param, setHash };
};

export default useLocation;