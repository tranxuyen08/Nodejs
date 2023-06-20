async function getApiQuestions() {
  const response = await fetch("http://localhost:8000/api/v1/question");
  const jsonData = await response.json();
  const randomIndex = Math.floor(Math.random() * jsonData.length);
  const render = document.querySelector('.main-content')
  const htmlData = `
  <div class="question-content">
      ${jsonData[randomIndex].content}
    </div>
    <div class="btn-group">
      <button onclick=(handleDislike(${jsonData[randomIndex].dislike},${jsonData[randomIndex].id})) class="btn" id="dislike">${jsonData[randomIndex].dislike}/Không/Dislike</button>
      <button class="btn" id="like">${jsonData[randomIndex].like}/Có/Like</button>
    </div>
    `
  render.innerHTML += htmlData
}
async function handleDislike(dislike, id) {

  const newDislike = dislike + 1;
  // const updatedQuestion = {
  //   dislike: newDislike
  // };
  // await fetch(`http://localhost:8000/api/v1/question/${id}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(updatedQuestion)
  // });
}
getApiQuestions()