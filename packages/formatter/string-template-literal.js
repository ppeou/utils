console.clear();
const data = {
  "jcr:primaryType": "cq:Tag",
  "jcr:createdBy": "admin",
  "jcr:title": "Asset Properties",
  "jcr:created": "Thu Oct 27 2022 20:33:29 GMT-0500",
  "jcr:description": "",
  "sling:resourceType": "cq/tagging/components/tag",
  "orientation": {
    "jcr:primaryType": "cq:Tag",
    "jcr:createdBy": "admin",
    "jcr:title": "Orientation",
    "jcr:created": "Thu Oct 27 2022 20:33:29 GMT-0500",
    "jcr:description": "",
    "sling:resourceType": "cq/tagging/components/tag",
    "portrait": {
      "jcr:primaryType": "cq:Tag",
      "jcr:createdBy": "admin",
      "jcr:title": "Portrait",
      "jcr:created": "Thu Oct 27 2022 20:33:29 GMT-0500",
      "jcr:description": "",
      "sling:resourceType": "cq/tagging/components/tag"
    },
    "landscape": {
      "jcr:primaryType": "cq:Tag",
      "jcr:createdBy": "admin",
      "jcr:title": "Landscape",
      "jcr:created": "Thu Oct 27 2022 20:33:29 GMT-0500",
      "jcr:description": "",
      "sling:resourceType": "cq/tagging/components/tag"
    },
    "square": {
      "jcr:primaryType": "cq:Tag",
      "jcr:createdBy": "admin",
      "jcr:title": "Square",
      "jcr:created": "Thu Oct 27 2022 20:33:29 GMT-0500",
      "jcr:description": "",
      "sling:resourceType": "cq/tagging/components/tag"
    }
  },
  "style": {
    "jcr:primaryType": "cq:Tag",
    "jcr:createdBy": "admin",
    "jcr:title": "Style",
    "jcr:created": "Thu Oct 27 2022 20:33:29 GMT-0500",
    "jcr:description": "",
    "sling:resourceType": "cq/tagging/components/tag",
    "color": {
      "jcr:primaryType": "cq:Tag",
      "jcr:createdBy": "admin",
      "jcr:title": "Color",
      "jcr:created": "Thu Oct 27 2022 20:33:29 GMT-0500",
      "jcr:description": "",
      "sling:resourceType": "cq/tagging/components/tag"
    },
    "monochrome": {
      "jcr:primaryType": "cq:Tag",
      "jcr:createdBy": "admin",
      "jcr:title": "Monochrome",
      "jcr:created": "Thu Oct 27 2022 20:33:29 GMT-0500",
      "jcr:description": "",
      "sling:resourceType": "cq/tagging/components/tag",
      "grayscale": {
        "jcr:primaryType": "cq:Tag",
        "jcr:createdBy": "admin",
        "jcr:title": "Grayscale",
        "jcr:created": "Thu Oct 27 2022 20:33:29 GMT-0500",
        "jcr:description": "",
        "sling:resourceType": "cq/tagging/components/tag"
      }
    }
  }
};

const trim = (aa) => {
  return Object.entries(aa).reduce((p, [k,v]) => {    
    if(typeof v === 'string') {      
      if(k === 'jcr:title') {
        p[k] = v;
      }
    } else if (typeof v === 'object'){        
        p[k] = trim(v);
      }
    return p;
  }, {});  
};

const tags = trim(data);

const pathFinder = ((depth, za) => {
  const iid = `tags${new Date().getTime()}`;
  window[iid] = za;
  //console.log(iid, window[iid]);
  return Array.from(new Array(depth)).reduce((p, i, idx) => {    
    const loop = Array.from(new Array(idx));
    const argList = loop.map((i, idx) => `arg${idx}`).join(',');
    const returnPath = loop.map((i, idx) => `?.[arg${idx}]`).join('');    
    p[idx] = new Function(`${argList}`, `return window['${iid}']${returnPath};`);
    return p;
  }, {});
})(10, tags);
//console.log('pathFinder', pathFinder);
const getPath = (path) => {
  const fields = path.split('/');
  console.log('fields', fields);
  console.log('fn', pathFinder[fields.length]);
  return pathFinder[fields.length](...fields);
};

//console.log(tags);    
console.log(getPath('orientation/landscape'));
