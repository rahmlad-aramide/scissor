const sendRequest = async () => {
  const url = 'https://cutly.onrender.com/api/v1/users/login';
  const headers = {
    // eslint-disable-next-line prettier/prettier
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const body = new URLSearchParams();
  body.append('grant_type', '');
  body.append('username', 'abdrahmanoladimeji02@gmail.com');
  body.append('password', 'password');
  body.append('scope', '');
  body.append('client_id', '');
  body.append('client_secret', '');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body.toString(),
    });

    const data = await response.json();
    console.log(data);
    // Process the response data as needed
  } catch (error) {
    console.error(error);
    // Handle any errors that occurred during the request
  }
};

sendRequest();
