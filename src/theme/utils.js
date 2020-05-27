export const marginGenerator = marginArray => {
  if (marginArray.length > 4) {
    console.error('marginGenerator: Array cannot exceed 4 values');
    return false;
  }
  let margin = {};
  const type = marginCode => {
    switch (marginCode) {
      case 'mt':
        return 'marginTop';
      case 'mb':
        return 'marginBottom';
      case 'ml':
        return 'marginLeft';
      case 'mr':
        return 'marginRight';
      default:
        return '';
    }
  };
  marginArray.forEach(current => {
    let marginSplit = current.split('-');
    margin[type(marginSplit[0])] =
      marginSplit.length > 2 ? `-${marginSplit[2]}px` : `${marginSplit[1]}px`;
  });
  return margin;
};

export const paddingGenerator = paddingArray => {
  if (paddingArray.length > 4) {
    console.error('paddingArray: Array cannot exceed 4 values');
    return false;
  }
  let padding = {};
  const type = paddingCode => {
    switch (paddingCode) {
      case 'pt':
        return 'paddingTop';
      case 'pb':
        return 'paddingBottom';
      case 'pl':
        return 'paddingLeft';
      case 'pr':
        return 'paddingRight';
      default:
        return '';
    }
  };
  paddingArray.forEach(current => {
    let paddingSplit = current.split('-');
    padding[type(paddingSplit[0])] =
      paddingSplit.length > 2
        ? `-${paddingSplit[2]}px`
        : `${paddingSplit[1]}px`;
  });
  return padding;
};
