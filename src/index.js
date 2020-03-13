'use strict';

// convenience function for loading additional scripts
function loadScript(options) {
    console.log('Loading script: ')
    console.log(options)
    // Tag is required (e.g. 'script', 'link')
    if (!options.hasOwnProperty('tag')) {
        return false
    }
    var prior = document.getElementsByTagName('script')[0]
    return new Promise(function (resolve, reject) {
        let newScript = document.createElement(options.tag);
        newScript.onerror = reject
        newScript.onload = resolve


        if (options.hasOwnProperty('attributes')
            && typeof options.attributes === 'object'
            && !Array.isArray(options.attributes)) {

            for (const [key, value] of Object.entries(options.attributes)) {
                newScript[key] = value
            }

        }

        prior.parentNode.insertBefore(newScript, prior)

    });
}

// Note that the window location here is the location of the file that is calling index.js, not the location of index.js.
let cssPath = `${window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))}/custom_templates/Template_1/src/template_1.css`
let libFilePath = `${window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))}/custom_templates/Template_1/src/lib.js`

/*  Examples on how to load css files, external javascript files, and additional internal javascript files.
 *  Note the use of 'async: false'. The allows one script to finish executing,
 *  before any subsequent scripts are executed. Without it, scripts *may* execute 
 *  out of order.
*/ 
let scriptList = [
    {
        tag: 'link',
        'attributes': {
            href: cssPath,
            rel: 'stylesheet'
        }
    }, {
        tag: 'script',
        attributes: {
            crossOrigin: 'anonymous',
            async: false,
            src: 'https://unpkg.com/react@16/umd/react.development.js'
        }
    }, {
        tag: 'script',
        attributes: {
            crossOrigin: 'anonymous',
            async: false,
            src: 'https://unpkg.com/react-dom@16/umd/react-dom.development.js'
        }
    }, {
        tag: 'script',
        async: false,
        attributes: {
            src: libFilePath
        }
    }
]

scriptList.forEach((script) => {
    loadScript(script)
})

function demo() {

    // If "Template_1" is selected as the active template,
    // then the "Template_1" event will be triggered each time search
    // results are returned. The event name is synonymous with the value for
    // "template_name" that you give when you create a template object via the API. 
    // If you do not listen for this exact event, the template will not work.
    document.addEventListener("Template_1", function (event) {

        // Yadle_App is defined in lib.js
        Yadle_App(event)
    });



}

// This function get executed as soon as index.js is loaded.
demo();
