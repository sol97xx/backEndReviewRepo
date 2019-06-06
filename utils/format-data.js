exports.formatData = (arr, refArr) => {
    // let arrClone = [...arr];
    
    let arrClone = arr.map((element) => {
      let elementClone = {...element}
      let correctData = refArr.find((refElement)=>{return refElement['title'] === elementClone['belongs_to']});
      elementClone['article_id'] = correctData['article_id'];
      elementClone['author'] = elementClone['created_by']
      elementClone.created_at = new Date(elementClone.created_at)
      delete elementClone['belongs_to']
      delete elementClone['created_by']
      return elementClone
    })
    
    return arrClone;
  }
// - `comment_id` which is the primary key                            k
//   - `author` field that references a user's primary key (username) k      l
//   - `article_id` field that references an article's primary key           l
//   - `votes` defaults to 0                                          k
//   - `created_at` defaults to the current timestamp                 k
//   - `body`                                                         k
//    belongs_to KTR and created_by KTR
  exports.giveDate = (arr, refArr, refKey, substituteKey, keyToReplace) => {
    let arrClone = [...arr];
    arrClone.forEach((element) => {element.created_at = new Date(element.created_at)
    element.votes = 0}
    )
    return arrClone;
  }