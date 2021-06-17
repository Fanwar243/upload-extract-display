async function extract() {
    file = document.getElementById("file").files[0];
    const reader = new zip.ZipReader(new zip.BlobReader(file));
    const entries = await reader.getEntries();
    let images = [];
    if (entries.length === 5) {
        for (i=0; i < entries.length; i++) {
            const image = await entries[i].getData(
                new zip.BlobWriter("image/jpeg")
            );
            const blobUrl = URL.createObjectURL(image);
            images.push(blobUrl);
        }
        document.getElementById("noImage").style.display = "none";
        let image1 = document.getElementById("image1");
        let image2 = document.getElementById("image2");
        let image3 = document.getElementById("image3");
        let image4 = document.getElementById("image4");
        let image5 = document.getElementById("image5");
        image1.src = images[0];
        image2.src = images[1];
        image3.src = images[2];
        image4.src = images[3];
        image5.src = images[4];
    }
    else {
        document.getElementById("tooBig").style.display = "block";
    }
    await reader.close();
}