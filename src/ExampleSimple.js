import React, { useRef } from "react";
import { Table, Row, Col } from "./components";

function ExampleSimple() {
    return (
        <Table
            theme={"light"}
            showGrid={true}
            selectionMode={"cell"}
            tableId={"simpeTable"}
            headerData={[
                { title: "A" },
                { title: "B" },
                { title: "C" },
                { title: "D" },
                { title: "E" },
                { title: "F" },
                { title: "G" },
                { title: "H" },
                { title: "I" },
                { title: "J" },
                { title: "K" },
                { title: "L" },
                { title: "M" },
            ]}
        >
            {(tableProvided) => {
                return (
                    <>
                        <Row
                            style={{ minHeight: 40 }}
                            {...tableProvided.rowProps}
                        >
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                        </Row>
                        <Row
                            style={{ minHeight: 40 }}
                            {...tableProvided.rowProps}
                        >
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                        </Row>
                        <Row
                            style={{ minHeight: 40 }}
                            {...tableProvided.rowProps}
                        >
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                        </Row>
                        <Row
                            style={{ minHeight: 40 }}
                            {...tableProvided.rowProps}
                        >
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                            <Col>234567</Col>
                        </Row>
                    </>
                );
            }}
        </Table>
    );
}

export default ExampleSimple;
