// You should probably write some code here

const getNouns = () => {
  return new Promise((resolve,reject) => {
    $.get('../db/nouns.json')
      .done((data) => {
        resolve(data.nouns);
      })
      .fail((err) => {
        reject('I got an error!',err);
      });
  });
};

const getDescriptions = () => {
  return new Promise((resolve,reject) => {
    $.get('../db/descriptors.json')
      .done((data) => {
        resolve(data.descriptors);
      })
      .fail((err) => {
        reject('I got an error!',err);
      });
  });
};

const generateRandomNumber = (upperLimit,lowerLimit) => {
  const randomIndex = Math.floor(Math.random() * (upperLimit - lowerLimit + 1) + lowerLimit);
  return randomIndex;
};

const domStringBuilder = (nounsArray,descriptionsArray) => {
  const indexForNoun = generateRandomNumber(nounsArray.length,1);
  const indexForDescription1 = generateRandomNumber(descriptionsArray.length,1);
  const indexForDescription2 = generateRandomNumber(descriptionsArray.length,1);
  const domString = descriptionsArray[indexForDescription1].text + ' ' + descriptionsArray[indexForDescription2].text + ' ' + nounsArray[indexForNoun].text;
  return domString;
};

const printToDom = (nounsArray,descriptionsArray) => {
  const domString = domStringBuilder(nounsArray,descriptionsArray);
  $('#output').html(`<div class="panel panel-primary">${domString}</div>`);
};

const generateRandomInsult = () => {
  let nounsArray = [];
  let descriptionsArray = [];
  getNouns().then((nouns) => {
    nounsArray = nouns;
    return getDescriptions();
  }).then((descriptions) => {
    descriptionsArray = descriptions;
    // after both data get loaded
    printToDom(nounsArray,descriptionsArray);
  });
};

const bindGetInsultEvent = () => {
  $('button').on('click',generateRandomInsult);
};

module.exports = {
  bindGetInsultEvent,
};
