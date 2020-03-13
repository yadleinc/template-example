console.log('loading lib.js')

function Yadle_App(event_input) {
    const e = React.createElement;

    class SearchResults extends React.Component {
      constructor(props) {
        super(props);
        this.state = { 
          results: event_input.detail.search_results // Yadle search results are listed under this key.
        };
      }
    
      render() {
        return e('div', null, this.state.results.map((result, index) => {
            // Use the "basename" value to get the filename
            return e("p", {className: `test_search_result`, key: index}, result.basename)
        }));
      }
    }
    
    // '#custom-template' is the designated div for rendering your search results.
    const domContainer = document.querySelector('#custom-template');
    ReactDOM.render(e(SearchResults), domContainer);
}