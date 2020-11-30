export async function fetchUsers() {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM0YzY0Y2VkMjY2ODAwMTcwZWEzZGUiLCJpYXQiOjE2MDY3MzEzNDAsImV4cCI6MTYwNzk0MDk0MH0.CJ45vua2bICnWfXr96UZGghLe4icYacvwAYqOb0WlIk",
        },
      }
    );

    if (response.ok) {
      const users = await response.json();

      return users;
    } else {
      const error = await response.json();

      console.log(error);

      throw new Error(error);
    }
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}
