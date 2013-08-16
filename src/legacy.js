
  select = feature.qsa3 ? function (selector, root) {
    // Set root to given root or document
    root = root || doc;

    return root.querySelectorAll(selector);
  } : function (selector, root) {
    return sizzle(selector, root);
  };