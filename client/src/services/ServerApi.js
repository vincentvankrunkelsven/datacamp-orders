function request(endpoint, options = {}) {
  return fetch(endpoint, {
    accept: 'application/json',
    ...options,
  }).then(checkStatus)
    .then(parseJSON);
}

function get(endpoint) {
  return request(endpoint);
}

function post(endpoint, body) {
  return request(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
}

function del(endpoint) {
  return request(endpoint, {
    method: 'DELETE',
  });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export function getUsers() {
  return get('/users');
}

export function postOrders(orders) {
  return post('/orders/create', { orders });
}

export function getOrders() {
  return get('/orders');
}

export function deleteOrder(id) {
  return del(`/orders/${id}`);
}

export function getAutocomplete(userId) {
  return get(`/users/autocomplete/${userId}`)
}
