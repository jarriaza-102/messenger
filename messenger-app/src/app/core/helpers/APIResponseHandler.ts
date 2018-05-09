export class APIResponseHandler {


  static handle(promise, errors?) {
    document.querySelector('#loader').classList.remove("hidden");
    return promise.then(data => {
      return [null, data];
    })
      .catch(
        err => errors.push('Something went wrong')
      ).finally(
        () => document.querySelector('#loader').classList.add("hidden")
      );
  }

}
