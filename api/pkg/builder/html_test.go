package builder

import (
	"bytes"
	"os"
	"testing"
)

func TestGenerateHTML(t *testing.T) {
	tests := []struct {
		name       string
		doc        *Document
		isNilErr   bool
		outputFile string
	}{
		{"empty", &Document{
			Title: "plutov/plutov",
		}, true, "./testdata/test.html"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			w := &bytes.Buffer{}
			err := GenerateHTML(w, tt.doc, tt.name)
			if tt.isNilErr && err != nil {
				t.Errorf("expecting nil error, got %v", err)
			}

			if tt.isNilErr {
				expected, _ := os.ReadFile(tt.outputFile)
				if w.String() != string(expected) {
					t.Errorf("expecting %s, got %s", string(expected), w.String())
				}
			}
		})
	}
}
