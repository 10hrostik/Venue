let transformFilterPane = {
    setToForm: function(criteria, type, objectType) {
                    if(criteria != null) {
                        document.getElementById("searchText " + type).placeholder = criteria.searchText == '' || criteria.searchText == undefined ? "Search text" : criteria.searchText;
                        document.getElementById("firstDate " + type).value = criteria.firstDate == undefined ? null : criteria.firstDate;
                        document.getElementById("lastDate " + type).value = criteria.lastDate == undefined ? null : criteria.lastDate;
                        document.getElementById("firstPrice " + type).value = criteria.firstPrice == undefined ? null : criteria.firstPrice;
                        document.getElementById("lastPrice " + type).value = criteria.lastPrice == undefined ? null : criteria.lastPrice;       
                        let genres = document.getElementsByClassName("genre" + objectType);
                        let flag = false;

                        if(criteria.genresToSearch != null) {
                            for(let i = 0; i <  genres.length; i++) {
                                for(let j = 0; j <criteria.genresToSearch.length; j++) {
                                    if(this.extractGenreFromId(genres[i].id) == criteria.genresToSearch[j]) {
                                        genres[i].checked = true;
                                        flag = true;
                                    }
                                }
                                if(flag == false) {
                                    genres[i].checked = false;
                                } else {
                                    flag = false;
                                }
                            }
                        } 
                    }
    },
    extractGenreFromId: (id) => {
        const words = id.trim().split(/\s+/);
        return words[0];
    },

    transformGenreCriteria: function(genres, objectType) {
        let inputs = [];
        let iterator = 1;
        for(let genre of genres) {
            inputs.push(<input key={"input" + iterator} className={"genre" + objectType}  style={{border: "4px solid black"}} type="checkbox" id={genre + ' ' + objectType} name={genre + " genre"}/>)
            inputs.push(<label style={{fontWeight: 650}} key={"label" + iterator} htmlFor={genre + " genre"}>{genre}</label>)
            inputs.push(<br key={"br" + iterator}/>)
            iterator++;
        }
        return inputs;
    },
    setDefaultFilter: function(type, objectType) {
        document.getElementById("searchText " + type).placeholder = "Search text";
        document.getElementById("searchText " + type).value = null;
        document.getElementById("firstDate " + type).value =  null;
        document.getElementById("lastDate " + type).value = null;
        document.getElementById("firstPrice " + type).value = null;
        document.getElementById("lastPrice " + type).value = null;       
        let genres = document.getElementsByClassName("genre" + objectType);  

        for(let j = 0; j < genres.length; j++) {
            genres[j].checked = false;
        }
    }
}

export default transformFilterPane;