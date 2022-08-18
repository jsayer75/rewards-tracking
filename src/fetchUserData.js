const fetchUsersData = async () => {
  const apiData = await fetch("/api/userData")
    .then((res) => res.json())
    .then((json) => json.userdata)
    .catch((err) => console.error(err));

  return apiData;
};

export default fetchUsersData;
