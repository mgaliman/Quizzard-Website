const preview = document.getElementById("preview");
function showPreview(quiz) {
    preview.style.display = 'block';
    preview.innerHTML = `<div class="quizName">
                <label for="quizTitle">${quiz.name}</label>
            </div>
            <div translate="no">
                <hr class="rounded">
                {{#each ${quiz.question}}}
                <div class="container">
                    <div class="question-container">
                        <Button type="button" class="question">{{this.text}}</Button>
                    </div>
                    <div class="answer-container">
                        {{#each ${this.answers}}}
                        <button class="answer{{@index}}"><i class="material-icons">check_box_outline_blank</i>
                            <p>{{this.}}</p>
                        </button>
                        {{#each}}
                    </div>
                </div>
                <hr class="rounded">
                {{#each}}
            </div>
            <hr class="rounded">
            <div class="btn-group myGroup" role="group" aria-label="Basic mixed styles example" style="margin: 0 30%;">
                <a href="/game/joiningScreen?name={{this.Title}}">
                    <button type="button" class="btn btn-primary">Play</button>
                </a>
                <a href="/registeredUser/createAQuiz?name={{this.Title}}">
                    <button type="button" class="btn btn-info">Update</button>
                </a>
                <a href="/registeredUser/myProfile/deleteQuiz?id={{this.IDQuiz}}"><button type="button"
                        class="btn btn-danger" style="background: #c04595;">Delete</button></a>
            </div>`

}
function hidePreview() {
    preview.style.display = 'none';
    preview.innerHTML = '';
}
