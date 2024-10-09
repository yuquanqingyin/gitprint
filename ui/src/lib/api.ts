export async function call(path: string, init?: RequestInit) {
  try {
    if (init) {
      init["cache"] = "no-store";
    }

    const host = process.env.NEXT_PUBLIC_API_ADDR;

    console.log("calling", `${host}${path}`);
    const res = await fetch(`${host}${path}`, init);
    const data = await res.json();

    if (!data) {
      return {
        status: 500,
        error: "invalid response",
        data: {},
      };
    }

    if (res.status < 200 || res.status >= 300) {
      console.error("unable to call the api", data.message ?? res.status);
      return {
        status: res.status,
        error: data.message ?? "unable to call the api",
        data: {},
      };
    }

    return {
      status: res.status,
      error: "",
      data: data.data,
    };
  } catch (e) {
    console.error("unable to call the api", e);
    return {
      status: 500,
      error: "unable to call the api",
      data: {},
    };
  }
}

export async function post(path: string, payload: object) {
  const headers = {
    "Content-Type": "application/json",
  };

  return call(path, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: headers,
  });
}

export async function get(path: string) {
  const headers = {};

  return call(path, {
    method: "GET",
    headers: headers,
  });
}

export async function getJWT(code: string, state: string) {
  return await get(`/github/auth/callback?code=${code}&state=${state}`);
}
