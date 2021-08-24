import * as SQLite from 'expo-sqlite';    
const db = SQLite.openDatabase("history.db",1);
const add = (id,subject, content, imgUrl, link, date, nowdate) => {
        // is text empty?
        
        if (subject === null || subject === "") {
            return false;
        }      
        if (imgUrl === null || imgUrl === "") {
            return false;
        }
        if (link === null || link === "") {
            return false;
        }
        if (date === null || date === "") {
            return false;
        }
        if (nowdate === null || nowdate === "") {
            return false;
        }
        
        db.transaction(
            
            tx => {
                tx.executeSql("insert into history (id,subject, content,imgUrl,link,date,nowdate) values (?, ?,?,?,?,?,?)", [id,subject,content,imgUrl,link,date,nowdate]);
                //tx.executeSql("select * from history order by nowdate desc", [], (_, { rows }) => console.log(JSON.stringify(rows)));
            },
            (err) => {
                 console.log("sql 실패 :" ,err)
            },
            () => {
                 console.log("sql 성공")
            }
        );
}
export const deleteData = (subject) => {
    if (subject === null || subject === "") {
            return false;
    }

    db.transaction(
            
            tx => {
                tx.executeSql("DELETE FROM history  WHERE subject = ?", [subject]);
            },
            (err) => {
                 console.log("sql 실패 :" ,err)
            },
            () => {
                 console.log("sql 성공")
            }
        );
    
}
const update = (subject, nowdate) => {
        // is text empty?
        
        if (subject === null || subject === "") {
            return false;
        }
        
        if (nowdate === null || nowdate === "") {
            return false;
        }
        
        db.transaction(
            
            tx => {
                tx.executeSql("UPDATE history SET nowdate = ? WHERE subject = ?", [nowdate,subject]);
               // tx.executeSql("select * from history order by nowdate desc", [], (_, { rows }) => console.log(JSON.stringify(rows)));
            },
            (err) => {
                 console.log("sql 실패 :" ,err)
            },
            () => {
                 console.log("sql 성공")
            }
        );
}
export const getContent = () => {
        // is text empty?
    
    var result;
        
     db.transaction(
        
        tx => {
            
            tx.executeSql("select * from history", [], (_, { rows }) => {
                result= JSON.stringify(rows);
            });
        },
        (err) => {
                console.log("sql 없음 :" ,err)
        },
        () => {
            return result;
                          
        }
    );
   // console.log("결과",data);
}
export const checkAdd = (id,subject, content, imgUrl, link, date, nowdate) => {
        // is text empty?
        
        if (subject === null || subject === "") 
            return false;
    
        
        db.transaction(
            
            tx => {
                
                tx.executeSql("select * from history where subject= ?", [subject], (_, { rows }) => {
                    if (!rows.length>0) {
                        add(id, subject, content, imgUrl, link, date, nowdate);
                    } else {
                        update(subject, nowdate);
                    }
                });
            },
            (err) => {
                 console.log("sql 없음 :" ,err)
            },
            (result) => {
                 console.log("sql 있음",result)
            }
        );
    }