// Section for profile information//
const overview = document.querySelector(".overview");
const showRepoList = document.querySelector(".repo-list");
const username = "YL31";
const 

const getProfile = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
};
getProfile();

const displayUserInfo = function (data) {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-info");
    userDiv.innerHTML = `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(userDiv);
    fetchRepos();
};

const fetchRepos = async function () {
    const repoList = await fetch (`https://api.github.com/users/${username}/repos?visibility=public&sort=updated&per_page=100`);
    const repos = await repoList.json();
    displayRepoInfo(repos);
};

const displayRepoInfo = function (repos) {
  for (const repo of repos) {
    const listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${repo.name}</h3>`;
    showRepoList.append(listItem);
  }
};