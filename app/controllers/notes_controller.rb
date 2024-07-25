class NotesController < ApplicationController
  def create
    note = Note.new(note_params)
    if note.save
      render json: note
    end
  end

  def index
    notes = Note.all
    render json: notes
  end

  def change_status
    note = Note.find(params[:id])
    if note
      note.checked = true
      note.save
    end
    render json: note
  end

  def destroy
    note = Note.find(params[:id])
    if note.destroy
      render json: 'note destroyed'
    end
  end
  def notify
    notes = Note.all
    notes.each do |e|
      n = Date.now
      if e.reminder_date.min == x.min
        render json: e
      end
    end
  end
  # employees
  private

  def note_params
    params.require(:note).permit(:note, :reminder_date)
  end
end
