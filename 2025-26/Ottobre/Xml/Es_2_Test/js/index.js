"use script"
window.onload = function () {
    let xml = dati;
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml, "text/xml");


    let xmlRoot = xmlDoc.getElementsByTagName("Tests")[0];

    for (let i = 0; i < xmlRoot.children.length; i++) {
        let TestId = "", TestType = "", Name = "", CommandLine = "", Input = "", Output = "", Datas = "";

        let test = xmlRoot.children[i];
        if (test.getAttribute("TestId")) {
            TestId = test.getAttribute("TestId");

        }
        if (test.getAttribute("TestType")) {
            TestType = test.getAttribute("TestType");
        }

        for (let j = 0; j < test.children.length; j++) {
            let field = test.children[j];
            //devo gestire cosa devo prendere
            switch (field.nodeName) {
                case "Name": {
                    Name = field.textContent;
                    break;
                }
                case "CommandLine":
                    CommandLine = field.textContent;
                    break;

                case "Input":
                    Input = field.textContent;
                    break;

                case "Output":
                    Output = field.textContent;
                    break;
                case "DataExecution":
                    for (let k = 0; k < field.children.length; k++) {
                        let data = field.children[k];
                        switch (data.nodeName) {
                            case "data":
                                if (k == 0) {
                                    Datas += data.textContent;
                                }
                                else {
                                    Datas += " | " + data.textContent;
                                }
                                break;
                        }
                    }
                    break;
            }

        }
        console.log("Test:" +" " + TestId + " | " + TestType + " | " + Name + " | " + CommandLine + " | " + Input + " | " + Output + " | " + Datas);
    }
}