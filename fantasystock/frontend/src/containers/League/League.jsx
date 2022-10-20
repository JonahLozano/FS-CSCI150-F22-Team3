import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InlineUser from "../../components/InlineUser/InlineUser";
import "./League.css";

function League() {
  const [stk, setStk] = useState("");
  const [qnt, setQnt] = useState(1);
  const [pos, setPos] = useState("Long");

  const [comment, setComment] = useState("");
  const [editableComment, setEditableComment] = useState([]);
  const [editComment, setEditComment] = useState([]);

  const [reply, setReply] = useState([]);

  const [stkList, setstkList] = useState([]);
  const [tickers, setTickers] = useState([]);

  const stash = (env) => {
    if (stk === "") return;

    setstkList((prev) => [
      ...prev,
      { stock: stk, quantity: qnt, position: pos },
    ]);
    setStk("");
    setQnt(1);
    setPos("Long");
  };

  const deleteStk = (index) => {
    setstkList((prev) => {
      const thing = [...prev];
      thing.splice(index, 1);
      return thing;
    });
  };

  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    commentsection: [String],
    end: Date,
    start: Date,
    host: String,
    players: [String],
    title: String,
    visibility: String,
  });

  useEffect((event) => {
    axios
      .get(`/league/${id}`)
      .then((response) => {
        console.log(response.data);

        let startDate = new Date(response.data.start);
        startDate = `${
          startDate.getUTCMonth() + 1
        }/${startDate.getUTCDate()}/${startDate.getUTCFullYear()}`;

        let endDate = new Date(response.data.end);
        endDate = `${
          endDate.getUTCMonth() + 1
        }/${endDate.getUTCDate()}/${endDate.getUTCFullYear()}`;

        setData({
          commentsection: response.data.commentsection,
          end: endDate,
          start: startDate,
          host: response.data.host,
          players: response.data.players,
          title: response.data.title,
          visibility: response.data.visibility,
        });

        setEditableComment(
          new Array(response.data.commentsection.length).fill(false, 0)
        );
        setEditComment(
          new Array(response.data.commentsection.length).fill("", 0)
        );
        setReply(new Array(response.data.commentsection.length).fill("", 0));

        setShow(true);
      })
      .catch((error) => {
        setShow(false);
        console.log(error);
      });

    axios
      .get(`/price/tickers`)
      .then((response) => {
        setTickers(response.data);
      })
      .catch((error) => {});
  }, []);

  const joinLeague = () => {
    axios.patch("/league/join", {
      stocks: stkList.map((aStock) => {
        return {
          stock: aStock.stock,
          quantity: aStock.quantity,
          position: aStock.position.toLowerCase(),
        };
      }),
      gameID: id,
    });
  };
  return (
    <div>
      <div>{`Title: ${data.title}`}</div>
      <div>
        Host:
        <InlineUser
          to={`/user/${data.host._id}`}
          aAlt={`${data.host.username}'s Profile`}
          design="circlePic"
          aSrc={data.host.photo}
          username={data.host.username}
        />
      </div>
      <div>{`Visibility: ${data.visibility}`}</div>
      <div>{`start: ${data.start}`}</div>
      <div>{`end: ${data.end}`}</div>

      <div className="CLStocks" style={{ margin: "4rem 0" }}>
        <label>Stocks</label>

        <div>
          <label htmlFor="clTicker">Ticker:</label>
          <input
            id="clTicker"
            list="data"
            name="data"
            onChange={(e) => {
              setStk(e.target.value);
            }}
            value={stk}
            placeholder="Pick a stock"
          />
          <datalist id="data">
            {tickers.map((item, key) => (
              <option key={key} value={item} />
            ))}
          </datalist>

          <label htmlFor="clQuantity">Quantity:</label>
          <input
            id="clQuantity"
            type="number"
            min="1"
            max="999"
            onChange={(e) => {
              setQnt(e.target.value);
            }}
            value={qnt}
          />

          <label htmlFor="clPosition">Position:</label>
          <select
            id="clPosition"
            onChange={(e) => setPos(e.target.value)}
            value={pos}
          >
            <option>Long</option>
            <option>Short</option>
          </select>

          <input
            type="button"
            value="Pick"
            style={{ margin: "0 1rem" }}
            onClick={stash}
          />

          {stkList.map((aStock, index) => (
            <div style={{ fontSize: "1rem" }} key={index}>
              {aStock.stock} {aStock.quantity} {aStock.position}
              <input
                type="button"
                value="delete"
                onClick={() => deleteStk(index)}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <input type="button" value="Join :P" onClick={joinLeague} />
      </div>
      <div style={{ marginTop: "4rem" }}>Players</div>
      {show &&
        data.players.map((player, index) => {
          return (
            <div key={index} className="leagueUserCard">
              <InlineUser
                to={`/user/${player.player._id}`}
                aAlt={`${player.player.username}'s Profile`}
                design="circlePic"
                aSrc={player.player.photo}
                username={player.player.username}
              />
              <div className="leagueUserCardStocks">
                Stocks
                {player.stocks.map((stock, index) => {
                  return (
                    <div key={index}>
                      {stock.ticker} {stock.quantity} {stock.position}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

      <div className="LeagueCommentSection">
        <div>Comment Section</div>
        <div>
          <textarea
            id="LeagueComment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Leave a Comment :P"
          />
          <input
            type="button"
            value="Post Comment"
            onClick={() =>
              axios.patch("/league/comment", { gameID: id, comment })
            }
          />
        </div>
        {show &&
          data.commentsection.map((data, index) => {
            return (
              <div key={index} className="LeagueComment">
                <InlineUser
                  to={`/user/${data.owner._id}`}
                  aAlt={`${data.owner.username}'s Profile`}
                  design="circlePic"
                  aSrc={data.owner.photo}
                  username={data.owner.username}
                />
                <div className="LeagueCommentData">{data.comment}</div>
                <div className="LeagueCommentData">
                  Likes:{data.likes} Dislikes:{data.dislikes}
                </div>

                {data.isOwner && (
                  <span>
                    {editableComment[index] && (
                      <div>
                        <textarea
                          onChange={(e) => {
                            const tmpThing = editComment;
                            tmpThing[index] = e.target.value;
                            setEditComment([...tmpThing]);
                          }}
                          value={editComment[index]}
                        />
                        <input
                          type="button"
                          value="Post Edit"
                          onClick={() =>
                            axios.patch("/league/comment/edit", {
                              gameID: id,
                              commentID: data.commentID,
                              comment: editComment[index],
                            })
                          }
                        />
                      </div>
                    )}
                    <input
                      type="button"
                      value="Edit"
                      onClick={() => {
                        const tmpThing = editableComment;
                        tmpThing[index] = !tmpThing[index];
                        setEditableComment([...tmpThing]);
                      }}
                    />
                    <input
                      type="button"
                      value="Delete"
                      onClick={() =>
                        axios.patch("/league/comment/delete", {
                          gameID: id,
                          commentID: data.commentID,
                        })
                      }
                    />
                  </span>
                )}
                <input type="button" value="Like" />
                <input type="button" value="Dislike" />
                <div className="LeagueCommentReplySection">
                  Replies:
                  {data.replies.map((reply, index) => {
                    return (
                      <div key={index} className="LeagueCommentReply">
                        <InlineUser
                          to={`/user/${reply.replyowner._id}`}
                          aAlt={`${reply.replyowner.username}'s Profile`}
                          design="circlePic"
                          aSrc={reply.replyowner.photo}
                          username={reply.replyowner.username}
                        />
                        <div className="LeagueCommentData">{reply.reply}</div>
                        <div className="LeagueCommentData">
                          Likes:{reply.replylikes} Dislikes:
                          {reply.replydislikes}
                        </div>
                        <div>
                          {reply.isOwner && (
                            <span>
                              {editableComment[index] && (
                                <div>
                                  <textarea
                                    onChange={(e) => {
                                      const tmpThing = editComment;
                                      tmpThing[index] = e.target.value;
                                      setEditComment([...tmpThing]);
                                    }}
                                    value={editComment[index]}
                                  />
                                  <input
                                    type="button"
                                    value="Post Edit"
                                    onClick={() =>
                                      axios.patch("/league/comment/edit", {
                                        gameID: id,
                                        commentID: data.commentID,
                                        comment: editComment[index],
                                      })
                                    }
                                  />
                                </div>
                              )}
                              <input
                                type="button"
                                value="Edit"
                                onClick={() => {
                                  const tmpThing = editableComment;
                                  tmpThing[index] = !tmpThing[index];
                                  setEditableComment([...tmpThing]);
                                }}
                              />
                              <input
                                type="button"
                                value="Delete"
                                onClick={() =>
                                  axios.patch("/league/comment/delete", {
                                    gameID: id,
                                    commentID: data.commentID,
                                  })
                                }
                              />
                            </span>
                          )}
                          <input type="button" value="Like" />
                          <input type="button" value="Dislike" />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <textarea
                    onChange={(e) => {
                      const tmpThing = reply;
                      tmpThing[index] = e.target.value;
                      setReply([...tmpThing]);
                    }}
                    value={reply[index]}
                    placeholder="Leave a Reply :P"
                  />
                  <input
                    type="button"
                    value="Post Reply"
                    onClick={() => {
                      axios.patch("/league/comment/reply", {
                        gameID: id,
                        commentID: data.commentID,
                        comment: reply[index],
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default League;
