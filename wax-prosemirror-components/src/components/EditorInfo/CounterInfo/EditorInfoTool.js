import React, { useMemo, useState, useRef, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';
import { v4 as uuidv4 } from 'uuid';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import MenuButton from '../../../ui/buttons/MenuButton';
import useOnClickOutside from '../../../helpers/useOnClickOutside';


const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;
`;

const DropWrapper = styled.div`
  margin-top: ${grid(1)};
  position: absolute;
  background: white;
  top: 32px;
  width: max-content;
`;
const CounterInfoComponent = styled.div`
  display: flex;
  flex-direction: column;
  background:white
  border:1px solid gray;
  position:fixed;
  bottom:45px;
  right:50px;
`;
const Counter = styled.div`
  min-width: 150px;
  height: 25px;
  margin:5px;
  display: block;
  cursor: pointer;
  color:black;
  font-size:14px;
`;

const EditorInfoTool = ({ view: { state }, item }) => {
  const { title } = item;
  const [isOpen, setIsOpen] = useState(false);
  const [getWordCountFromState, setTotalWords] = useState();
  const [totalCharCount, setTotalCharCount] = useState();
  const [totalCharCountWithoutSpace, setTotalCharWithoutSpace] = useState();
  const [getSelectionCountFromState, setSelectedTextCount] = useState();
  const [paraCount, setTotalParagraph] = useState();
  const [imgCount, setImgCount] = useState();
  const [tableCount, setTableCount] = useState();
  const [footnoteCount, setFootNoteCount] = useState();
  const [blocklevelNode, setBlockLevelNodes] = useState();
  const ref = useRef();
  const {activeView } = useContext(WaxContext);
  const allBlockNodes = DocumentHelpers.findBlockNodes(state.doc);
  const InlineNodes = DocumentHelpers.findInlineNodes(state.doc);

  useOnClickOutside(ref, () => setIsOpen(false));
  

  const infoDropDownOptions = [
    { name: `${getWordCountFromState} Words` },
    { name: `${totalCharCount} Characters` },
    { name: `${totalCharCountWithoutSpace} Character Without Space` },
    { name: `${paraCount} Paragraph` },
    { name: `${imgCount} Images` },
    { name: `${tableCount} Tables` },
    { name: `${footnoteCount} Footnotes` },
    { name: `${blocklevelNode} Block-Level Nodes` },
  ];

  const renderList = () => {
    const lists = [];

    Object.keys(infoDropDownOptions).forEach(key=>{
      lists.push(
        <Counter key={uuidv4()}
          title={infoDropDownOptions[key].name}><span>{infoDropDownOptions[key].name}</span>
        </Counter>
      );
    });
    return <div>{lists}</div>;
  };
  const getCount = useCallback(() => {
    let getWordCountFromStates = 0;
    InlineNodes.forEach(value => {
      if (value.node.text !== undefined && value.node.text.length > 0) {
        value.node.text.trim().split(" ").forEach((key, pos) => {
          if (key.length > 0) {
            getWordCountFromStates += 1;
          }
        })
      }
    })
    return getWordCountFromStates
  });
  const getCharCount = useCallback(() => {
    let totalCharCounts = 0;

    InlineNodes.forEach(value => {
      if (value.node.text !== undefined) {
        totalCharCounts += value.node.text.length;
      }
    })

    return totalCharCounts;
  });
  const getCharCountWithoutSpace = useCallback(() => {
    let totalCharCountWithoutSpaces = 0;
    InlineNodes.forEach(value => {
      if (value.node.text !== undefined) {
        totalCharCountWithoutSpaces += value.node.text.replace(/\s+/g, '').length;
      }
    })

    return totalCharCountWithoutSpaces;
  });
  useEffect(() => {
    let footNoteCount = 0;
    let blockLevelCount = 0;
    let paraCounts = 0;
    let tableCounts = 0;
    let imgCounts = 0;
    let listTableCount = 0;
    let nestTableCount = 0;
    allBlockNodes.forEach(value => {
      if (value.pos === 0) {
        blockLevelCount = 0;
      }
      else {
        blockLevelCount = allBlockNodes.length;
      }
    })
    setBlockLevelNodes(blockLevelCount);
    allBlockNodes.forEach(value => {
      value.node.forEach(imgs => {
        if (imgs.type.name === "image") {
          imgCounts += 1;
        }
        if (imgs.type.name === "footnote") {
          footNoteCount += 1;
        }
      })

    })
    state.doc.content.content.forEach(value => {
      if (value.attrs.class === "paragraph" && value.content.size > 0) {
        paraCounts += 1;
      }
      if (value.type.name === "table") {
        tableCounts += 1;
      }
      value.content.content.forEach(listTable => {
        listTable.content.content.forEach(lastListTable => {
          if (lastListTable.type.name === "table") {
            listTableCount += 1
          }
          lastListTable.content.content.forEach(nestedTable => {
            nestedTable.content.content.forEach(nestedTypeTable => {
              if (nestedTypeTable.type.name === "table") {
                nestTableCount += 1;
              }
            })
          })
        })
      })
    })
    setImgCount(imgCounts);
    setTotalParagraph(paraCounts);
    setTableCount(tableCounts + listTableCount + nestTableCount);
    setFootNoteCount(footNoteCount);
    setTotalCharCount(getCharCount());
    setTotalWords(getCount());
    setTotalCharWithoutSpace(getCharCountWithoutSpace());
    let selectedCountPara = 0;
    let selectedCountList = 0;
    let selectedCountNest = 0;
    let noteTextValue = 0;
    let footNodeCount = 0;
    let selectedListTableCount = 0;
    let finalNestedValueCount = 0;
    activeView.state.selection.content().content.content.forEach(value => {
      value.content.content.forEach((textValue) => {
        if (textValue.text) {
          const textArray = textValue.text.trim().split(" ");
          let isChar = false;
          textArray.forEach((key, pos) => {
            // eslint-disable-next-line no-restricted-globals
            if (key.charCodeAt(pos) !== 32 && isNaN(key.charCodeAt(pos))===false) {
              isChar = true;
            }
          })
          if (isChar) {
            selectedCountPara += textValue.text.trim().split(' ').length;
          }
        }
        textValue.content.content.forEach(listValue => {
          if (listValue.text && listValue.text !== ' ') {
            const listArray = listValue.text.trim().split(' ');
            let isFootChar = false;
            listArray.forEach((key, pos) => {
              if (key.charCodeAt(pos) !== 32) {
                isFootChar = true;
              }
            })
            if (isFootChar) {
              footNodeCount += listValue.text.trim().split(' ').length;
            }
          }
          listValue.content.content.forEach(listItem => {
            if (listItem.text && listItem.text !== ' ') {
              const itemArray = listItem.text.trim().split(' ');
              let isItemChar = false;
              itemArray.forEach((key, pos) => {
                // eslint-disable-next-line no-restricted-globals
                if (key.charCodeAt(pos) !== 32 && isNaN(key.charCodeAt(pos))===false) {
                  isItemChar = true;
                }
              })
              if (isItemChar) {
                selectedCountList += listItem.text.trim().split(' ').length;
              }
            }
            listItem.content.content.forEach(nestedItem => {
              nestedItem.content.content.forEach(nestIn => {
                if (nestIn.text !== undefined) {
                  const nestArray = nestIn.text.trim().split(" ");
                  let isNestChar = false;
                  nestArray.forEach((key, pos) => {
                    // eslint-disable-next-line no-restricted-globals
                    if (key.charCodeAt(pos) !== 32 && isNaN(key.charCodeAt(pos))===false) {
                      isNestChar = true;
                    }
                  })
                  if (nestIn.text && isNestChar) {
                    selectedCountNest += nestIn.text.trim().split(' ').length;
                  }
                }
              
                nestIn.content.content.forEach(listTable => {
                  if (listTable.text !== undefined) {
                    const listTableArray = listTable.text.trim().split(' ');
                    let isListChar = false;
                    listTableArray.forEach((key, pos) => {
                      // eslint-disable-next-line no-restricted-globals
                      if (key.charCodeAt(pos) !== 32 && isNaN(key.charCodeAt(pos))===false) {
                        isListChar = true;
                      }
                    })
                    if (listTable.text && isListChar) {
                      selectedListTableCount += listTable.text.trim().split(' ').length
                    }
                  }


                  listTable.content.content.forEach(tableValue => {
                    tableValue.content.content.forEach(finalTableValue => {
                      if (finalTableValue.text !== undefined) {
                        const finalTableArray = finalTableValue.text.trim().split(" ")
                        let isFinalTable = false;
                        finalTableArray.forEach((key, pos) => {
                          // eslint-disable-next-line no-restricted-globals
                          if (key.charCodeAt(pos) !== 32 && isNaN(key.charCodeAt(pos))===false) {
                            isFinalTable = true;
                          }
                        })
                        if (finalNestedValueCount.text && isFinalTable) {
                          finalNestedValueCount = finalTableValue.text.trim().split(" ").length
                        }
                      }
                    })
                  })
                })
              })
            })
          })
        })
      })
      if (value.text !== undefined) {
        const valueArray = value.text.trim().split(" ");
        let isValue = false;
        valueArray.forEach((key, pos) => {
          // eslint-disable-next-line no-restricted-globals
          if (key.charCodeAt(pos) !== 32 && isNaN(key.charCodeAt(pos))===false) {
            isValue = true;
          }
        })
        if (isValue) {
          noteTextValue += value.text.trim().split(" ").length;
        }
      }
    });
    setSelectedTextCount(selectedCountNest + finalNestedValueCount + selectedListTableCount + selectedCountPara + selectedCountList + noteTextValue + footNodeCount)
    if (activeView.state.selection.$from.pos === activeView.state.selection.$to.pos) {
      setSelectedTextCount(0);
    }

  })
  const MenuButtonComponent = useMemo(
    () => (
      <Wrapper ref={ref}>

        <MenuButton
          active={isOpen}
          disabled={false}
          label={`${getSelectionCountFromState >0 ? getSelectionCountFromState : getWordCountFromState} 
          word${getSelectionCountFromState && getSelectionCountFromState > 1 ? 's' : ''}${!getSelectionCountFromState && getWordCountFromState > 1 ? 's' : ''}`}
          onMouseDown={() => setIsOpen(true)}
          title={title}
        />

        {isOpen && (
          <DropWrapper>
            <CounterInfoComponent key={uuidv4()} item={item} view={state}
              close={() => {
                setIsOpen(false);
              }}>{renderList()}</CounterInfoComponent>
          </DropWrapper>
        )}
      </Wrapper>
    ),
    [isOpen, getWordCountFromState, getSelectionCountFromState],
  );
  return MenuButtonComponent
};

export default EditorInfoTool;

