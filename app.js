async function extract() {
    file = document.getElementById("file").files[0]; //user uploaded archive
    let imagePlaceholders = [
        document.getElementById("image1"),
        document.getElementById("image2"),
        document.getElementById("image3"),
        document.getElementById("image4"),
        document.getElementById("image5")]
    try {
        const reader = new zip.ZipReader(new zip.BlobReader(file)); //new reader object to read files in the archive
        const entries = await reader.getEntries();
        let images = [];
        if (entries.length === 5) {
            for (i=0; i < entries.length; i++) {
                const image = await entries[i].getData( //method that rewrites the read data as Blob objects
                    new zip.BlobWriter("image/jpeg")
                );
                const blobUrl = URL.createObjectURL(image);
                images.push(blobUrl);
            }
            document.getElementById("noImage").style.display = "none";
            for (i=0; i < imagePlaceholders.length; i++) {
                imagePlaceholders[i].src = images[i];
            }
        }
        else {
            document.getElementById("tooBig").style.display = "block";
        }
        await reader.close();
    } catch(err) {
        console.log(err);
        document.getElementById("error").style.display = "block";
    }
    
}