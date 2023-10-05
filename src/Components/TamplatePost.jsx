import React, { useRef } from 'react';
import { render } from 'react-dom';
import { Button } from 'primereact/button';
import { EmailEditor, EditorRef, EmailEditorProps } from 'react-email-editor';
import { useParams } from 'react-router-dom';


const TamplatePost = (props) => {
    const { id } = useParams();
    console.log(id)
    const emailEditorRef = useRef(null);
    const exportHtml = () => {
        const unlayer = emailEditorRef.current?.editor;

        unlayer?.exportHtml(async (data) => {
            const { design, html } = data;
            console.log(html);

            const config = {
                method: "PATCH",
                url: "https://api.hexarz.com/v1/api/manage/blogadmin/blog/catagories",
                headers: { api_key: window.localStorage.getItem('token') },
                data: {
                    post_id: id,
                    name: '',
                    logo: '',
                    cata_id: '',
                }
            };

            try {
                await axios(config).then(async (res) => {
                    console.log("res:", res)
                    await fetchListusers().then(() => { setOpenedit(!openedit) })
                })

            } catch (error) {
                console.log(error.toString());
                // Handle error
            }

        });
    };

    const CreateTestTools = () => {
        const unlayer = emailEditorRef.current?.editor;
        console.log(unlayer);
        unlayer.registerTool({
            name: 'my_tool',
            label: 'My Tool',
            icon: 'fa-smile',
            supportedDisplayModes: ['web', 'email'],
            options: {},
            values: {},
            renderer: {
                Viewer: unlayer.createViewer({
                    render(values) {
                        return "<div>I am a custom tool.</div>"
                    }
                }),
                exporters: {
                    web: function (values) {
                        return "<div>I am a custom tool.</div>"
                    },
                    email: function (values) {
                        return "<div>I am a custom tool.</div>"
                    }
                },
                head: {
                    css: function (values) { },
                    js: function (values) { }
                }
            },
            validator(data) {
                return [];
            },
        });
    }

    const onReady = (unlayer) => {
        // CreateTestTools();
        unlayer.setBodyValues({
            backgroundColor: "#00000",
            contentWidth: "500px", // or percent "50%"
            fontFamily: {
                label: "Helvetica",
                value: "'Helvetica Neue', Helvetica, Arial, sans-serif"
            },
            preheaderText: "Hello World"
        });
        // console.log(unlayer);
        // setTimeout(() => {
        //     var ListTagA = document.getElementsByTagName("a");
        //     console.log(ListTagA);
        //     ListTagA.forEach(element => {
        //         console.log(element.className);
        //         if (element.className == "blockbuilder-branding") {
        //             element.remove()
        //         }
        //     });

        // }, 2000);
        // document.getElementsByClassName("blockbuilder-branding")
    };

    return (

        <div>
            <button className='bg-blue-500 my-2 mr-5 px-3 py-1 rounded-lg text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%' onClick={exportHtml}>ذخیره</button>
            <EmailEditor options={{
                tabs: {
                    content: {
                        enabled: true,
                    },
                    blocks: {
                        enabled: true,
                    },
                    'custom#my_tab': {
                        enabled: true,
                        position: 3,
                        icon: "fa-user"
                    }
                },
                projectId: 185153,
                tools: {
                    'custom#test': {
                        properties: {
                            mapType: {
                                editor: {
                                    data: {
                                        options: [{
                                            label: "coin",
                                            value: "BTC"
                                        }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                },
                locale: "fa",
                customJS: [
                    "https://examples.unlayer.com/examples/custom-js/custom.js"
                ],
            }} minHeight={"97vh"} ref={emailEditorRef} onReady={onReady} style={{ width: "100%", height: "100vh !important" }} />
        </div>
    );
};

export default TamplatePost;

