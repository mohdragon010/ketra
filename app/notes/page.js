'use client'

import { useState } from 'react'
import { useNotes } from '@/app/contexts/notesContext'
import { useRouter } from 'next/navigation'
import {
  Box,
  Paper,
  Typography,
  Container,
  Button,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import {
  Add,
  Delete,
  Edit,
  Description
} from '@mui/icons-material'
import moment from 'moment'
import ScrollToTop from '../components/ScrollToTop'

const NotesPage = () => {
  const { notes, createNote, deleteNote } = useNotes()
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState(null)

  const handleCreateNote = () => {
    const noteId = createNote()
    router.push(`/notes/${noteId}`)
  }

  const openDeleteDialog = (e, noteId) => {
    e.stopPropagation()
    setNoteToDelete(noteId)
    setDeleteDialogOpen(true)
  }

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false)
    setNoteToDelete(null)
  }

  const confirmDelete = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete)
    }
    closeDeleteDialog()
  }

  const getPreviewText = (htmlContent) => {
    if (typeof window === 'undefined') return ''
    const div = document.createElement('div')
    div.innerHTML = htmlContent
    const text = div.textContent || div.innerText || ''
    return text.substring(0, 150) + (text.length > 150 ? '...' : '')
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" fontWeight="bold">
          📝 My Notes
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateNote}
          size="large"
        >
          New Note
        </Button>
      </Box>

      {notes.length === 0 ? (
        <Paper 
          elevation={2} 
          sx={{ 
            p: 8, 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3
          }}
        >
          <Description sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.5 }} />
          <Typography variant="h5" color="text.secondary">
            No notes yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create your first note to get started!
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateNote}
            size="large"
          >
            Create Your First Note
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Card 
                elevation={2}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => router.push(`/notes/${note.id}`)}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    noWrap
                  >
                    {note.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '60px'
                    }}
                  >
                    {getPreviewText(note.content)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Updated: {moment(note.updatedAt).fromNow()}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/notes/${note.id}`)
                    }}
                  >
                    Edit
                  </Button>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => openDeleteDialog(e, note.id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
      >
        <DialogTitle>Delete Note?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this note? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ScrollToTop />
    </Container>
  )
}

export default NotesPage
