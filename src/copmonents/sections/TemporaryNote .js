import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Button, Input, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';

const TemporaryNote = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    if (note.trim()) {
      setNotes([...notes, note]);
      setNote('');
    }
  };

  const clearNotes = () => {
    setNotes([]);
  };

  return (
    <Card className="shadow-lg p-4 text-center">
      <CardTitle tag="h4" className="mb-4" data-testid="temporary-note-title">Temporary Notes</CardTitle>
      <CardBody>
        <FormGroup>
          <Input
            type="textarea"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your note here..."
            rows="3"
            className="mb-3 shadow-sm"
            data-testid="note-input"
          />
        </FormGroup>
        <div className="d-flex justify-content-center">
          <Button
            style={{ background: '#2c5f6e', color: 'white' }}
            className="mx-2"
            onClick={addNote}
            disabled={!note.trim()}
            data-testid="add-note-button"
          >
            Add Note
          </Button>
          <Button
            color="danger"
            className="mx-2"
            onClick={clearNotes}
            disabled={notes.length === 0}
            data-testid="clear-all-button"
          >
            Clear All
          </Button>
        </div>
        {notes.length > 0 && (
          <div className="mt-4">
            <h5>Your Notes:</h5>
            <ListGroup className="mt-3">
              {notes.map((item, index) => (
                <ListGroupItem
                  key={index}
                  className="d-flex justify-content-between align-items-center shadow-sm mb-2"
                  data-testid="note-item"
                >
                  <span>{item}</span>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => setNotes(notes.filter((_, i) => i !== index))}
                    data-testid="delete-note-button"
                  >
                    Delete
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default TemporaryNote;
