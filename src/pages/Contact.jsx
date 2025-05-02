import React from 'react'

export default function Contact() {
  return (
    <div className="p-5 font-sans">
      <h1 className="text-center text-2xl font-bold">Contact Us</h1>
      <form action='https://formspree.io/f/myzerelo' method='POST' className="max-w-xl mx-auto flex flex-col gap-4">
        <label className="flex flex-col">
          Name:
          <input
            type="text"
            name='name'
            placeholder="Enter your name"
            className="w-full p-2 mt-1 rounded border border-gray-300"
          />
        </label>
        <label className="flex flex-col">
          Email:
          <input
            type="email"
            name='email'
            placeholder="Enter your email"
            className="w-full p-2 mt-1 rounded border border-gray-300"
          />
        </label>
        <label className="flex flex-col">
          Message:
          <textarea
            placeholder="Enter your message"
            rows="5"
            name='message'
            className="w-full p-2 mt-1 rounded border border-gray-300"
          ></textarea>
        </label>
        <button
          type="submit"
          className="p-2 bg-red-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
