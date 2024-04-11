import { NextResponse } from "next/server";

const createPasswordChangeTicket = async (data) => {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");

  let body = JSON.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    email: data.email,
    connection: "Username-Password-Authentication",
  });

  let requestOptions = {
    method: "POST",
    headers: headers,
    body: body,
  };

  await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/dbconnections/change_password`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log("result", result))
    .catch((error) => console.log("error", error));
};

const getAccessToken = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var body = JSON.stringify({
    client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
    client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
    audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
    grant_type: "client_credentials",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: body,
    redirect: "follow",
  };

  const response = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    requestOptions
  );
  const data = await response.json();
  return data.access_token;
};

const createUser = async (data) => {
  const token = await getAccessToken();
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  let body = JSON.stringify(data);

  let requestOptions = {
    method: "POST",
    headers: headers,
    body: body,
    redirect: "follow",
  };

  await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log("result", result))
    .catch((error) => console.log("error", error));
};

export async function POST(req) {
  try {
    console.log("Creating User");
    const body = await req.json();
    const data = body.formData;
    await createUser(data);
    await createPasswordChangeTicket(data);

    return NextResponse.json({ message: "Teams Reset" }, { status: 200 });
  } catch (error) {
    console.log("Error Creating User", error);
    return NextResponse.json(
      { message: "Error Resetting Teams" },
      { status: 200 }
    );
  }
}
