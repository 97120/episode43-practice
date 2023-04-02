

const inputTag = document.getElementById( "uploadFile" );
const uploadButtonTag = document.querySelector( "#uploadButton" )
const myImgtag = document.querySelector( "#myImages" )

const upload = async () =>
{
    uploadButtonTag.innerHTML = `
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    loading...`
    const formData = new FormData();
    formData.append( "files", inputTag.files[0] );
    formData.append( "files", inputTag.files[1] );

    const response = await fetch( "http://localhost:3000/upload", {
        method: "POST",
        body: formData
    } );
    //uploadButtonTag.textContent = "Uploaded";
    uploadButtonTag.innerHTML = "Uploaded"
    const data = await response.json();
    console.log( data )
    const dataFromSever = data.bucketData
    //console.log( dataFromSever[410].Key );
    const myContents = dataFromSever.filter( image => image.Key.includes( "than-zaw-oo/" ) )
    console.log( myContents )
    //const firstImage = myContents[0];
    //const imageUrl = `https://msquarefdc.sgp1.digitaloceanspaces.com/${firstImage.Key}`
    // const imageUrl = `https://msquarefdc.sgp1.digitaloceanspaces.com/${encodeURIComponent( firstImage.Key )}`
    // console.log( imageUrl )
    for ( let i = 0; i < myContents.length; i++ )
    {
        const imgDiv = document.createElement( "div" );
        // imgDiv.innerHTML = `
        //     <img src="https://msquarefdc.sgp1.digitaloceanspaces.com/${myContents[i].Key}"/>`
        const title = myContents[i].Key.split( "/" );
        const titleValue = title[title.length - 1];
        console.log( titleValue )
        const imgTitle =
            imgDiv.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="https://msquarefdc.sgp1.digitaloceanspaces.com/${myContents[i].Key}" class="card-img-top" alt="...">
            <div class="card-body">
                ${titleValue}
            </div>
        </div>`

        myImgtag.append( imgDiv )


    }

}