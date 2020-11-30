export async function usersFetch() {
  try {
    const response = fetch(
      `https://striveschool-api.herokuapp.com/api/profile/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.REACT_TOKEN,
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
